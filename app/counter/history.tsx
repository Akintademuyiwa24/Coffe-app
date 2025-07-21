import { View, Text, StyleSheet } from "react-native";

export default function IdeaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.ideaText}>This is the Idea Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  ideaText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});