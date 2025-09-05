import * as ImagePicker from "expo-image-picker";

/**
 * ImagePicker.ImagePickerAsset를 FormData로 변환하는 유틸리티 함수
 * @param key formData의 키 값(ex. "image")
 * @param assets ImagePicker의 assets 배열
 * @returns FormData
 */
const getFormDataImages = (key: string, assets: ImagePicker.ImagePickerAsset[]) => {
  const formData = new FormData();
  assets.forEach(({ uri, mimeType = "images/jpeg" }) => {
    const file = {
      uri,
      type: mimeType,
      name: uri.split("/").pop(),
    };
    formData.append(key, file as unknown as File);
  });
  return formData;
};

export { getFormDataImages };
