import { baseUrls } from "@/api/axios";
import { ImageUri } from "@/types";
import { router } from "expo-router";
import React from "react";
import { Image, Platform, Pressable, ScrollView, StyleSheet } from "react-native";

interface ImagePreviewListProps {
  imageUris: ImageUri[];
}

const ImagePreviewList = ({ imageUris = [] }: ImagePreviewListProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {imageUris.map(({ uri }, index) => {
        const imageUri = `${Platform.OS === "ios" ? baseUrls.ios : baseUrls.android}/${uri}`;
        return (
          <Pressable
            style={styles.imageContainer}
            key={uri + index}
            onPress={() =>
              router.push({
                pathname: "/image",
                params: { uri: imageUri },
              })
            }
          >
            <Image source={{ uri: imageUri }} style={styles.image} key={uri + index} />
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
    flexGrow: 1,
  },
  imageContainer: {
    width: 90,
    height: 90,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});

export default ImagePreviewList;
