import * as SecureStore from "expo-secure-store";

const getSecureStore = async (key: string): Promise<string | null> => {
  return await SecureStore.getItemAsync(key);
};

const setSecureStore = async (key: string, value: string): Promise<void> => {
  await SecureStore.setItemAsync(key, value);
};

const deleteSecureStore = async (key: string): Promise<void> => {
  await SecureStore.deleteItemAsync(key);
};

export { deleteSecureStore, getSecureStore, setSecureStore };
