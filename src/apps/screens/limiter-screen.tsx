import { api, Gateway } from "@/libs/axios";
import { BaseResponse } from "@/types";
import { User } from "@/types/implement";
import React, { useRef, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";

const LimiterScreen = () => {
  const [completed, setCompleted] = useState<number[]>([]);
  const [running, setRunning] = useState(false);
  const logs = useRef<string[]>([]);
  const lastCompletedTime = useRef<number | null>(null);

  const handlePress = () => {
    if (running) return;
    setRunning(true);
    logs.current = [];
    setCompleted([]);
    lastCompletedTime.current = null;

    const start = Date.now();

    for (let i = 0; i < 10; i++) {
      const requestIndex = i;

      api.get<BaseResponse<User>>(`${Gateway.BOOKING}/tours`)
        .then(() => {
          const now = Date.now();
          const elapsedFromStart = now - start;

          // Tính khoảng thời gian từ response trước đó đến hiện tại
          let delta = 0;
          if (lastCompletedTime.current !== null) {
            delta = now - lastCompletedTime.current;
          }
          lastCompletedTime.current = now;

          logs.current.push(
            `✅ Request ${requestIndex} completed in ${elapsedFromStart}ms (Δ ${delta}ms from previous)`
          );
        })
        .catch((err) => {
          logs.current.push(`❌ Request ${requestIndex} failed: ${err.message}`);
        })
        .finally(() => {
          setCompleted((prev) => {
            const updated = [...prev, requestIndex];
            if (updated.length === 10) setRunning(false);
            return updated;
          });
        });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Axios Rate Limiter</Text>
      <Button title="Send 10 Requests" onPress={handlePress} disabled={running} />
      <Text style={styles.info}>Completed: {completed.length} / 10</Text>
      <ScrollView style={styles.logBox}>
        {logs.current.map((log, idx) => (
          <Text key={idx} style={styles.logLine}>{log}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  info: { fontSize: 16, marginVertical: 10 },
  logBox: { maxHeight: 300, width: "100%", marginTop: 10, borderTopWidth: 1, paddingTop: 10 },
  logLine: { fontSize: 14, marginVertical: 2 },
});

export default LimiterScreen;
