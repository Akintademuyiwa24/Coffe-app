import { StyleSheet, TextInput, FlatList, View, Text, LayoutAnimation } from "react-native";

import { ShoppingListItem } from "../components/ShoppingListItem";
import { Link } from "expo-router";
import { theme } from "../theme";
import { useEffect, useState } from "react";
import { getStorageItem, setStorageItem } from "../utils/storage";

type ShoppingListItemProps = {
  id: string;
  name: string;
  isCompleted?: boolean;
  onCompletedTimestamp?: number;
  lastUpdateTimestamp?: number;
};

const initialItems: ShoppingListItemProps[] = [
  { id: "1", name: "Coffee" },
  { id: "2", name: "Tea", isCompleted: true },
  { id: "3", name: "Sossa", isCompleted: true },
  { id: "4", name: "Milk", isCompleted: true },
];

const storageKey = "shoppingList";
export default function App() {
  const [newItem, setNewItem] = useState("");
  const [shoppingList, setShoppingList] = useState<ShoppingListItemProps[]>(initialItems);

  useEffect(() => {
    const fetchInitialShoppingList = async () => {
      const data = await getStorageItem(storageKey);
      if (data) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setShoppingList(data);
      }
    };
    fetchInitialShoppingList();
  }, []);

  const handleSubmit = () => {
    if (newItem.trim() === "") return;
    const newShoppingItem = {
      id: Math.random().toString(),
      name: newItem,
      isCompleted: false,
      lastUpdateTimestamp: Date.now(),
    };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setShoppingList((prev) => [...prev, newShoppingItem]);
    setStorageItem(storageKey, [...shoppingList, newShoppingItem]);
    setNewItem("");
  };

  const handleDelete = (id: string) => {
    const newShoppingList = shoppingList.filter((item) => item.id !== id);
    setStorageItem(storageKey, newShoppingList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setShoppingList(newShoppingList);
  };

  const handleToggleComplete = (id: string) => {
   const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          // isCompleted: !item.isCompleted,
          onCompletedTimestamp: item.onCompletedTimestamp ? undefined : Date.now(),
          lastUpdateTimestamp: Date.now(),
        };
      }
      return item;
    });
    setStorageItem(storageKey, newShoppingList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setShoppingList(newShoppingList);
  };

  return (
    <FlatList
    data={orderShoppingList(shoppingList)}
    renderItem={({ item }) => (
      <ShoppingListItem key={item.id} name={item.name} isCompleted={Boolean(item.onCompletedTimestamp)} onDelete={() => handleDelete(item.id)} onToggleComplete={() => handleToggleComplete(item.id)} />
    )}
    style={styles.container} 
    contentContainerStyle={styles.contentContainer} 
    stickyHeaderIndices={[0]}
    ListEmptyComponent={
      <View style={styles.listEmptyContainer}>
        <Text>No items in the shopping list</Text>
      </View>
    }
    ListHeaderComponent={
       <TextInput 
      placeholder="E.g Coffee" 
      style={styles.textInput} 
      value={newItem} 
      onChangeText={setNewItem}
      returnKeyType="done"
      onSubmitEditing={handleSubmit}
      />
    }

    />
  );
}

function orderShoppingList(items: ShoppingListItemProps[]) {
  return items.sort((a, b) => {
    if(a.onCompletedTimestamp && b.onCompletedTimestamp) {
      return b.onCompletedTimestamp - a.onCompletedTimestamp;
    }
    if (a.onCompletedTimestamp && !b.onCompletedTimestamp) {
      return 1
    }
    if (!a.onCompletedTimestamp && b.onCompletedTimestamp) {
      return -1;
    }
    if(!a.onCompletedTimestamp && !b.onCompletedTimestamp) {
      const aTimestamp = a.lastUpdateTimestamp ?? 0;
      const bTimestamp = b.lastUpdateTimestamp ?? 0;
      return bTimestamp - aTimestamp;
    }
    return 0;
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", 
    paddingVertical: 12
  },
  contentContainer: {
    paddingBottom: 22,
  },
  textInput: {
   backgroundColor: theme.colorWhite,
    borderColor: theme.colorGray,
    borderWidth: 2,
    marginHorizontal: 10,
    padding: 12,
    marginBottom: 12,
    borderRadius: 50,
    fontSize: 18,
    color: theme.colorBlack,
  },
  listEmptyContainer: {
    
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});
