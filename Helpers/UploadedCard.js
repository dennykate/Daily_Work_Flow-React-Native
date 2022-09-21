import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const UploadedCard = ({ data }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: data.image }} style={styles.img} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {data.title.length > 30
            ? data.title.substring(0, 25) + "..."
            : data.title}
        </Text>
        <Text style={styles.uploadedAt}>Uploaded at - {data.modifiedAt}</Text>
        <Text style={styles.uploadedAt}>Page Name - {data.page}</Text>
        <Text style={styles.uploadedAt}>Translator - {data.translator}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 130,
    backgroundColor: "white",
    borderBottomColor: "grey",
    borderBottomWidth: 0.2,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  img: {
    width: 140,
    height: 90,
    resizeMode: "cover",
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  title: {
    fontSize: 14,

    fontWeight: "700",
    color: "purple",
  },
  uploadedAt: {
    fontSize: 11,

    marginTop: 5,
    fontWeight: "400",
    color: "#000",
  },
});

export default UploadedCard;
