import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

import { useDispatch } from "react-redux";

const ProcessingCard = ({ data }) => {
  const dispatch = useDispatch();
  const updateStatus = () => {
    dispatch({
      type: "ADD",
      payload: {
        token: Math.random(),
        ...data,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: data.image }} style={styles.img} />
      <View style={styles.detailContainer}>
        <View style={styles.textContainer}>
          {getStatusText(data.status)}

          <Text style={styles.pageName}>
            {data.page.length > 10
              ? data.page.substring(0, 10) + "..."
              : data.page}
          </Text>

          <Text style={styles.pageName}>{data.translator}</Text>
        </View>
        <Text style={styles.title}>
          {data.title.length > 30
            ? data.title.substring(0, 25) + "..."
            : data.title}
        </Text>

        {getModifiedTime(data.status, data.modifiedAt)}

        <TouchableOpacity
          style={styles.updateContainer}
          activeOpacity={0.5}
          onPress={updateStatus}
        >
          <Text style={styles.updateText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStatusText = (data) => {
  if (data == 0) {
    return <Text style={styles.translating}>■ Translating</Text>;
  } else if (data == 1) {
    return <Text style={styles.translated}>■ Translated</Text>;
  } else if (data == 2) {
    return <Text style={styles.encoding}>■ Encoding</Text>;
  } else if (data == 3) {
    return <Text style={styles.encoded}>■ Encoded</Text>;
  } else {
    return <></>;
  }
};

const getModifiedTime = (status, modifiedAt) => {
  if (status == 0) {
    return (
      <Text style={styles.modifiedTime}>Translating at - {modifiedAt}</Text>
    );
  } else if (status == 1) {
    return (
      <Text style={styles.modifiedTime}>Translated at - {modifiedAt}</Text>
    );
  } else if (status == 2) {
    return <Text style={styles.modifiedTime}>Encoding at - {modifiedAt}</Text>;
  } else if (status == 3) {
    return <Text style={styles.modifiedTime}>Encoded at - {modifiedAt}</Text>;
  } else {
    return <></>;
  }
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
  detailContainer: {
    width: Dimensions.get("screen").width - 170,
    height: "100%",
    marginLeft: 15,
    flexDirection: "column",
  },
  textContainer: {
    flexDirection: "row",
  },
  pageName: {
    fontSize: 12,
    fontWeight: "700",
    color: "black",
    margin: 3.5,
    marginLeft: 7,
  },
  translating: {
    color: "red",
    fontWeight: "700",
    fontSize: 10,
    margin: 5,
    letterSpacing: 0.5,
  },
  translated: {
    color: "#6dd5ed",
    fontWeight: "700",
    fontSize: 10,
    margin: 5,
    letterSpacing: 0.5,
  },
  encoding: {
    color: "#FF0099",
    fontWeight: "700",
    fontSize: 10,
    margin: 5,
    letterSpacing: 0.5,
  },
  encoded: {
    color: "green",
    fontWeight: "700",
    fontSize: 10,
    margin: 5,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
  },
  modifiedTime: {
    fontSize: 11,
    fontWeight: "500",
    fontFamily: "Roboto",
    marginTop: 5,
    color: "grey",
  },
  updateContainer: {
    width: 90,
    height: 28,
    backgroundColor: "#463DAE",
    borderRadius: 14,
    position: "absolute",
    right: 30,
    bottom: 3,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateX: 15 }],
  },
  updateText: {
    color: "white",
    fontFamily: "Roboto",
    fontWeight: "800",
    fontSize: 12,
  },
});

export default ProcessingCard;
