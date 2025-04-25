import { Image, StyleSheet, Platform, View, Text, Button } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Client } from "@notionhq/client";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useRef, useState } from "react";
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from "react-native-health";
import type { HealthInputOptions } from "react-native-health";
import ButtonFilled from "@/components/ButtonFilled";

const NOTION_API_KEY = "secret_CZbczrqj0YauenUSrVERvLx1Kxvk0F1OMCM2gH9yIh9";
const NOTION_DATABASE_ID = "10624d04bccb80e494eecfba18e8434b";

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
    write: [],
  },
} as HealthKitPermissions;

export default function HomeScreen() {
  const hasSyncd = useRef(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pedometerData, setPedometerData] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      if (error) {
        console.log("[ERROR] Cannot grant permissions!");
      } else {
        setIsAuthorized(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!isAuthorized) return;
    fetchFromHealthkit();
  }, [isAuthorized]);
  
  useEffect(() => {
    if (pedometerData.length === 0) return;
    if (hasSyncd.current) return; // We only want to auto-sync once when the app opens
    syncNotionDatabase(pedometerData);
  }, [pedometerData]);
  
  const fetchFromHealthkit = async () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const sharedOptions = {
      startDate: startOfMonth.toISOString(), // start of the past month
      endDate: now.toISOString(), // today
      limit: 10, // optional; default no limit
      period: 1440, // optional; 1440 minutes(24 hours)
      ascending: false, // optional; default false
    };

    const stepOptions = sharedOptions as HealthInputOptions;
    const distanceOptions = {
      ...sharedOptions,
      unit: "mile", // optional; default meter
    } as HealthInputOptions;

    const getDailyStepCountSamples = async () => {
      return new Promise((resolve, reject) => {
        AppleHealthKit.getDailyStepCountSamples(stepOptions, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    };

    const getDailyDistanceWalkingRunningSamples = async () => {
      return new Promise((resolve, reject) => {
        AppleHealthKit.getDailyDistanceWalkingRunningSamples(
          distanceOptions,
          (err, res) => {
            if (err) reject(err);
            else resolve(res);
          }
        );
      });
    };

    try {
      const stepData = await getDailyStepCountSamples();
      const distanceData = await getDailyDistanceWalkingRunningSamples();

      const combinedData = stepData.map((entry: HealthValue, index: number) => {
        return {
          date: entry.startDate,
          steps: entry.value,
          distance: distanceData[index].value,
        };
      });

      setPedometerData(combinedData);
    } catch (error) {
      console.error("Error fetching health data:", error);
    }
  };

  const syncNotionDatabase = async (newHealthkitData) => {
    hasSyncd.current = true;
    setIsSyncing(true);
    const latestNotionEntry = await getLatestNotionEntry();
    await replaceLatestDatabaseEntry(latestNotionEntry, newHealthkitData);
    await addAllDaysSinceLatestNotionEntry(latestNotionEntry, newHealthkitData);
    setIsSyncing(false);
    console.log('Sync complete!');
  }

  function areSameDay(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    return d1.getUTCFullYear() === d2.getUTCFullYear() &&
           d1.getUTCMonth() === d2.getUTCMonth() &&
           d1.getUTCDate() === d2.getUTCDate();
  }

  const getLatestNotionEntry = async () => {
    const notion = new Client({
      auth: NOTION_API_KEY,
    });
  
    try {
      const response = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
        sorts: [
          {
            property: "Date",
            direction: "descending",
          },
        ],
        page_size: 1,
      });
  
      if (response.results.length > 0) {
        return response.results[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching latest database entry:", error);
      throw error;
    }
  };

  const replaceLatestDatabaseEntry = async (latestNotionEntry, newHealthkitData) => {
    // The latest Notion database entry may not have the final count of steps and distance from that day.
    // This function will replace the latest Notion entry with the final count of steps and distance from that day.
    const notion = new Client({
      auth: NOTION_API_KEY,
    });
  
    try {
      // Step 1: Get the date of the latest Notion entry
      const latestNotionEntryDate = latestNotionEntry.properties.Date.date.start;

      // Step 2: Find the matching entry in newHealthkitData
      const latestMatchingEntryFromHealthkit = newHealthkitData.find(({ date }) => areSameDay(date, latestNotionEntryDate));

      if (!latestMatchingEntryFromHealthkit) {
        throw new Error(`No match found when trying to pair new HealthKit data with Notion DB data. Latest Notion entry date is: ${latestNotionEntryDate}`);
      }

      // Step 3: Create a new entry with the same date
      await postHealthData(latestMatchingEntryFromHealthkit);
  
      // Step 4: Delete the old entry
      await notion.pages.update({
        page_id: latestNotionEntry.id,
        archived: true,
      });
    } catch (error) {
      console.error("Error replacing latest database entry:", error);
      throw error;
    }
  };

  function formatDateForStorage(dateInput) {
    let date;
  
    // Check if dateInput is already a Date object
    if (dateInput instanceof Date) {
      date = dateInput;
    } else if (typeof dateInput === 'string') {
      // If it's a string, try to convert it to a Date object
      date = new Date(dateInput);
  
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date string provided');
      }
    } else {
      throw new Error('Invalid input type. Expected Date object or date string');
    }
  
    // Format the date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  
  const postHealthData = async (data: {
    date: Date;
    steps: number;
    distance: number;
  }) => {
    const notion = new Client({
      auth: NOTION_API_KEY,
    });

    try {
      const {date, steps, distance} = data;

      await notion.pages.create({
        parent: {
          type: "database_id",
          database_id: NOTION_DATABASE_ID,
        },
        properties: {
          Date: {
            type: "date",
            date: { start: formatDateForStorage(date) },
          },
          Steps: {
            type: "number",
            number: steps,
          },
          Distance: {
            type: "number",
            number: parseFloat(distance.toFixed(2)),
          },
        },
      });
    } catch (error) {
      console.error("Error posting health data:", error);
    }
  };

  const addAllDaysSinceLatestNotionEntry = async (latestNotionEntry, newHealthkitData) => {
    const latestNotionEntryDate = latestNotionEntry.properties.Date.date.start;

    const today = new Date();
    let currentIterationDate = new Date(latestNotionEntryDate);
    currentIterationDate.setDate(currentIterationDate.getDate() + 1); // Start from the day after the latest entry
  
    while (currentIterationDate <= today) {
      const formattedDate = currentIterationDate.toISOString().split('T')[0];
      const healthData = newHealthkitData.find(({ date }) => date.startsWith(formattedDate));
  
      if (healthData) {
        // If data exists for this day, post it
        await postHealthData({
          date: healthData.date,
          distance: healthData.distance,
          steps: healthData.steps
        });
      } else {
        // If no data for this day, post with zero values
        await postHealthData({
          date: healthData.date,
          distance: 0,
          steps: 0
        });
      }
  
      currentIterationDate.setDate(currentIterationDate.getDate() + 1);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/map.jpg")}
          style={styles.image}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your past 7 days</ThemedText>
        {/* <HelloWave /> */}
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {/* <ThemedText type="subtitle">Pedometer data:</ThemedText> */}
        {pedometerData.map(({ date, steps, distance }, index) => {
          const options = {
            year: "numeric",
            month: "long", // Options: 'short', 'long', 'numeric'
            day: "numeric",
          };

          return (
            <ThemedView key={index}>
              <ThemedText type="subtitle">
                {new Date(date).toLocaleDateString("en-US", options)}
              </ThemedText>
              <ThemedText>{steps} steps</ThemedText>
              <ThemedText>{distance.toFixed(2)} miles</ThemedText>
            </ThemedView>
          );
        })}
      </ThemedView>
      <ButtonFilled
        onPress={() => syncNotionDatabase(pedometerData)}
        title={isSyncing ? "Syncing..." : "Sync to database"}
        // disabled={isSyncing}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  image: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
