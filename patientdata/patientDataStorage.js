import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data to AsyncStorage
export const saveDataToStorage = async (key, data) => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
    console.log(`${key} saved to AsyncStorage.`);
  } catch (error) {
    console.error(`Error saving ${key} to AsyncStorage:`, error);
  }
};

// Load data from AsyncStorage
export const loadDataFromStorage = async (key) => {
  try {
    const jsonData = await AsyncStorage.getItem(key);
    if (jsonData !== null) {
      const data = JSON.parse(jsonData);
      console.log(`${key} loaded from AsyncStorage:`, data);
      return data;
    } else {
      console.log(`No ${key} found in AsyncStorage.`);
      return null;
    }
  } catch (error) {
    console.error(`Error loading ${key} from AsyncStorage:`, error);
    return null;
  }
};
