import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

// import components
import Header from "../Helpers/Header";
import ProcessingCard from "../Helpers/ProcessingCard";
import { firebase } from "../Helpers/FirebaseConfig";
import UpdateStatus from "../Helpers/UpdateStatus";

const ProcessingScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getDataFunc();
  }, []);

  const getDataFunc = async () => {
    const dataRef = await firebase
      .firestore()
      .collection("data")
      .where("status", "<", 4);
    await dataRef.onSnapshot((querySnapShot) => {
      const arr = [];
      querySnapShot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        arr.push(data);
      });
      console.log(arr);
      setData(arr);
    });
  };

  return (
    <View>
      <Header
        title={"Processing Items"}
        addItem={true}
        navigation={navigation}
      />
      <View style={styles.cardContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {data
            .sort((x, y) => y.modifiedMiliSec - x.modifiedMiliSec)
            .map((data, index) => (
              <ProcessingCard data={data} key={index} />
            ))}
        </ScrollView>
      </View>
      {/* <UpdateStatus /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 160,
  },
});

export default ProcessingScreen;
