import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getStorageItem(key: string){
    try {
        const data = await AsyncStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
}

export async function setStorageItem(key: string, value: object) {
    try {
        const data = JSON.stringify(value);
        await AsyncStorage.setItem(key, data);
    } catch {}
}