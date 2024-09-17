import { Image, StyleSheet, Platform, View, Text, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { Client } from "@notionhq/client";
import { ThemedView } from "@/components/ThemedView";

import { useEffect, useState } from "react";
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from "react-native-health";
import type { HealthInputOptions } from "react-native-health";

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
    fetchHealthData();
  }, [isAuthorized]);

  const fetchHealthData = async () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const sharedOptions = {
      startDate: startOfMonth.toISOString(), // start of the past month
      endDate: now.toISOString(), // today
      limit: 5, // optional; default no limit
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

      // Post this data to my Notion API for storage
      // await postHealthData(combinedData);

      setPedometerData(combinedData);
    } catch (error) {
      console.error("Error fetching health data:", error);
    }
  };

  const postHealthData = async (data: {
    date: Date;
    steps: number;
    distance: number;
  }) => {
  // const postHealthData = async (data: { steps: number; distance: number }) => {
  //   try {
  //     const response = await fetch(
  //       "https://your-api-endpoint.com/health-dataz",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       }
  //     );

    const notion = new Client({
      auth: notionApiKey,
    });

    try {
      // const response = await notion.databases.retrieve({
      //   database_id: notionDatabaseId,
      // });
      // console.log("Database found:", response.title[0].plain_text);

      const response = await notion.pages.create({
        parent: {
          type: "database_id",
          database_id: notionDatabaseId,
        },
        properties: {
          Date: {
            type: "date",
            date: { start: data[0].date },
          },
          Steps: {
            type: "number",
            number: data[0].steps,
          },
          Distance: {
            type: "number",
            number: parseFloat(data[0].distance.toFixed(2)),
          },
        },
      });

      // if (!response.ok) {
      //   throw new Error(`Server error: ${response.statusText}`);
      // }

      console.log("res:", response);

      console.log("Health data posted successfully");
    } catch (error) {
      console.error("Error posting health data:", error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
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

        <Button
          onPress={() => postHealthData(pedometerData)}
          title="Post to Notion"
        />
        {/* <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText> */}
      </ThemedView>
      {/* <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView> */}
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
