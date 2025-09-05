import axios from "axios";
import { Platform } from "react-native";

export const baseUrls = {
  android: "http://10.0.2.2:3030",
  ios: "http://localhost:3030",
  //   ios: "http://192.168.219.143:3030",
};

const axiosInstance = axios.create({
  baseURL: baseUrls[Platform.OS as keyof typeof baseUrls],
});

export default axiosInstance;
