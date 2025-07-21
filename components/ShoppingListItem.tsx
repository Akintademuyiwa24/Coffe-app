import { Pressable, Text, TouchableOpacity, StyleSheet, Alert, View } from "react-native";
import { theme } from "../theme";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

type ShoppingListItemProps = {
  name?: string;
  isCompleted?: boolean;
  onDelete?: () => void;
  onToggleComplete?: () => void;
};

export function ShoppingListItem({ name, isCompleted, onDelete, onToggleComplete }: ShoppingListItemProps) {
  const handleDelete = () => {
    Alert.alert(
      `Are you sure you want to delete ${name}?`,
      "It will be gone for good",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => onDelete && onDelete(),
          style: "destructive",
        },
      ],
    );
  };
  return (
    <Pressable 
      style={[styles.itemContainer, isCompleted ? styles.completedContainer : undefined]}
      onPress={onToggleComplete}
      >
        <View style={styles.nameRow}>
          <Entypo name={isCompleted ? "check" : "circle"} size={20} color={isCompleted ? theme.colorGray : theme.colorCerulean} style={styles.completedButton} />
          <Text numberOfLines={1} style={[styles.itemText, isCompleted ? styles.completedText : undefined]}>{name}</Text>

        </View>
      <TouchableOpacity
        activeOpacity={0.7}
       
        onPress={handleDelete}
      >
        <AntDesign name="closecircle" size={24} color={isCompleted ? theme.colorGray : theme.colorRed} />
        
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1, 
    borderBottomColor: theme.colorCerulean,
    paddingHorizontal: 12,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completedContainer: {
    backgroundColor: theme.colorLightGray,
    borderBottomColor: theme.colorGray,
    textDecorationLine: "line-through",
    
  },
  itemText: { fontSize: 18, fontWeight: "200", flex: 1,},
  
  completedButton : {
    backgroundColor: theme.colorGray,
    
  }, 
 
  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGray,
    color: theme.colorGray,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
});
 