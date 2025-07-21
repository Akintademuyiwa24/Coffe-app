
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";

export default function CounterScreen() {

  const handleRequestPermission = async () => {
    // Logic to request permission goes here
    const result = await registerForPushNotificationsAsync();
  };
   
  return (
    <View style={styles.container}>
 
      <TouchableOpacity style={styles.button} onPress={handleRequestPermission} activeOpacity={0.7}>

        <Text style={styles.buttonText}>Request Permission</Text>
      </TouchableOpacity>
        
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
  button: {
    backgroundColor: theme.colorBlack,
    borderRadius: 12,
    padding:12
  },
  buttonText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: theme.colorWhite,
    letterSpacing: 1,
  },
});