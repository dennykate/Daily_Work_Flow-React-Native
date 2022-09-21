import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { statuses } from "./DummyData";
import SelectDropdown from "react-native-select-dropdown";

import { firebase } from "./FirebaseConfig";
import { collection, updateDoc, doc } from "firebase/firestore";

const UpdateStatus = () => {
  const [open, setOpen] = useState();
  const [show, setShow] = useState();
  const [status, setStatus] = useState();
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      setShow(true);
      setStatus(data.status);
    }
  }, [data]);

  const updateData = () => {
    const db = firebase.firestore();
    const modifiedAt = getTime();
    const modifiedMiliSec = getMiliSec();

    updateDoc(doc(db, "data", data.id), {
      status: status,
      modifiedAt: modifiedAt,
      modifiedMiliSec: modifiedMiliSec,
    })
      .then(() => {
        ToastAndroid.showWithGravity(
          "Great Job, Upload Success!!",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setShow(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTime = () => {
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let h = date.getHours();
    let hour = h == 0 ? 12 : h > 12 ? h - 12 : h;
    hour = hour < 10 ? "0" + hour : hour;

    let minute = date.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;

    let time = h >= 12 ? "PM" : "AM";

    let modifiedAt = `${day}/${month + 1}/${year} ${hour}:${minute} ${time}`;

    return modifiedAt;
  };

  const getMiliSec = () => {
    const date = new Date();
    const miliSec = date.getTime();

    return miliSec;
  };

  return (
    <>
      {show ? (
        <View style={styles.container}>
          <View style={styles.card}>
            <Image source={{ uri: data.image }} style={styles.img} />
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.title}>{data.translator}</Text>
            <Text style={styles.title}>{data.page}</Text>
            <Text style={styles.title}>{data.modifiedAt}</Text>
            <SelectDropdown
              data={statuses}
              onSelect={(selectedItem, index) => {
                setStatus(index);
              }}
              defaultButtonText={"Update Status - " + statuses[status]}
              buttonTextStyle={{
                fontSize: 15,
                color: "white",
                fontWeight: "bold",
              }}
              buttonStyle={{
                width: "95%",
                backgroundColor: "#463DAE",
                alignSelf: "center",
                marginTop: 15,
              }}
            />
            <TouchableOpacity
              style={styles.updateBtn}
              onPress={() => {
                updateData();
              }}
            >
              <Text style={styles.updateBtnText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancleBtn}
              onPress={() => {
                setShow(false);
              }}
            >
              <Text style={styles.cancleBtnText}>Cancle</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000ba",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "80%",
    height: 450,
    backgroundColor: "#f5f5f5",
    padding: 5,
  },
  img: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 5,
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 10,
  },
  updateBtn: {
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "green",
    position: "absolute",
    right: 15,
    bottom: 20,
    borderRadius: 5,
  },
  cancleBtn: {
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "red",
    position: "absolute",
    left: 15,
    bottom: 20,
    borderRadius: 5,
  },
  updateBtnText: {
    fontWeight: "bold",
    color: "green",
  },
  cancleBtnText: {
    fontWeight: "bold",
    color: "red",
  },
});

export default UpdateStatus;
