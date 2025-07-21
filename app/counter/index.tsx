
import { View, Text, StyleSheet} from "react-native";

export default function CounterScreen() {
   
  return (
    <View style={styles.container}>
        
      <Text style={styles.counterText}>Counter Screen</Text>
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
  counterText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});