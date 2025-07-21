import { Tabs } from "expo-router";
import { Feather  } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome5  from "@expo/vector-icons/FontAwesome5";
import { theme } from "../theme";
import { TouchableOpacity } from "react-native";

export default function Layout() {
    return (
    <Tabs screenOptions={{
        tabBarButton: (props) => (
          <TouchableOpacity
            {...(props as React.ComponentProps<typeof TouchableOpacity>)}
            activeOpacity={0.8} // feel free to tweak this
          >
            {props.children}
          </TouchableOpacity>
        ),
        tabBarActiveTintColor: '#000', // optional styling
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: {
          paddingBottom: 8, // add space at the bottom
          height: 70,       // adjust height if needed
        },
     
      }}>
        <Tabs.Screen name="index" options={{title: "Shopping List", tabBarIcon: ({ color, size }) => <Feather name="list" size={size} color={color}/>}}/>
        <Tabs.Screen name="counter" options={{ headerShown: false, title: "Counter", tabBarIcon: ({ color, size }) => <AntDesign name="clockcircleo" size={size} color={color}/>}} />
        <Tabs.Screen name="idea" options={{title: "Idea", tabBarIcon: ({ color, size }) => <FontAwesome5 name="lightbulb" size={size} color={color}/>}}/>
    </Tabs>
    ); 
}