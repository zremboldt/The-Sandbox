import { Image, StyleSheet, Platform, View, Text, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import React, { useEffect, useState } from "react";
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
  const [stepCount, setStepCount] = useState(0);
  const [distance, setDistance] = useState(0);
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
    const sharedOptions = {
      date: new Date().toISOString(),
      includeManuallyAdded: false,
    };

    const stepOptions = sharedOptions as HealthInputOptions;
    const distanceOptions = {
      unit: "mile",
      ...sharedOptions,
    } as HealthInputOptions;

    const getStepCount = async () => {
      return new Promise((resolve, reject) => {
        AppleHealthKit.getStepCount(stepOptions, (err, res) => {
          if (err) reject(err);
          else resolve(res.value);
        });
      });
    };

    const getDistanceWalkingRunning = async () => {
      return new Promise((resolve, reject) => {
        AppleHealthKit.getDistanceWalkingRunning(
          distanceOptions,
          (err, res) => {
            if (err) reject(err);
            else resolve(res.value);
          }
        );
      });
    };

    try {
      const stepData = await getStepCount();
      const distanceData = await getDistanceWalkingRunning();

      // Send this to the server for storage
      // await postHealthData({
      //   steps: stepData,
      //   distance: distanceData,
      // });

      setStepCount(stepData);
      setDistance(distanceData);
    } catch (error) {
      console.error("Error fetching health data:", error);
    }
  };

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

  //     if (!response.ok) {
  //       throw new Error(`Server error: ${response.statusText}`);
  //     }

  //     console.log("Health data posted successfully");
  //   } catch (error) {
  //     console.error("Error posting health data:", error);
  //   }
  // };

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
        <ThemedText type="subtitle">
          Step count: {stepCount.toString()}
        </ThemedText>
        <ThemedText type="subtitle">Distance: {distance.toString()}</ThemedText>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
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
      </ThemedView>
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
