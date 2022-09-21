import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

// import components
import Header from "../Helpers/Header";
import UploadedCard from "../Helpers/UploadedCard";

// import helper
import { firebase } from "../Helpers/FirebaseConfig";

const UploadedScreen = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getDataFunc();
  }, []);

  const getDataFunc = async () => {
    const dataRef = await firebase
      .firestore()
      .collection("data")

      .where("status", "==", 4);

    await dataRef.onSnapshot((querySnapShot) => {
      const arr = [];
      querySnapShot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        arr.push(data);
      });
      setData(arr);
    });
  };
  return (
    <View>
      <Header title={"Uploaded Items"} addItem={false} />
      <View style={styles.cardContainer}>
        <ScrollView>
          {data
            .sort((x, y) => y.modifiedMiliSec - x.modifiedMiliSec)
            .map((item, index) => (
              <UploadedCard key={index} data={item} />
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 160,
  },
});

export default UploadedScreen;
