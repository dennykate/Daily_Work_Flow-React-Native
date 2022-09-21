import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
  Alert,
} from "react-native";

//import dependencies
import * as ImagePicker from "expo-image-picker";
import SelectDropdown from "react-native-select-dropdown";
import { firebase } from "../Helpers/FirebaseConfig";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { pages, translators, statuses } from "../Helpers/DummyData";

const AddItemScreen = ({ navigation }) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState("");
  const [translator, setTranslator] = useState("");
  const [status, setStatus] = useState(10);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (param) => {
    const res = await fetch(param);
    const blob = await res.blob();
    const fileName = param.substring(param.lastIndexOf("/") + 1);
    const ref = firebase.storage().ref().child(fileName).put(blob);
    try {
      await ref;
    } catch (e) {
      console.log(e);
    }

    getImageAssest(fileName);
  };

  const getImageAssest = async (fileName) => {
    const storage = getStorage();
    const reference = ref(storage, "/" + fileName);
    await getDownloadURL(reference).then((x) => {
      setImage(x);
      ToastAndroid.showWithGravity(
        "Add Image Success",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    });
  };

  const submitData = () => {
    const modifiedAt = getTime();
    const modifiedMiliSec = getMiliSec();
    if (
      image.length > 0 &&
      title.length > 0 &&
      page.length > 0 &&
      translator.length > 0 &&
      modifiedAt.length > 0 &&
      status < 4
    ) {
      const data = {
        image: image,
        title: title,
        page: page,
        translator: translator,
        status: status,
        modifiedAt: modifiedAt,
        modifiedMiliSec: modifiedMiliSec,
      };

      const db = firebase.firestore();
      addDoc(collection(db, "data"), data)
        .then(() => {
          ToastAndroid.showWithGravity(
            "Great Job, Upload Success!!",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          navigation.navigate("MainScreen");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert("Data Error!", "Please add all require data");
    }
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Items</Text>
      </View>
      <View style={styles.detailContainer}>
        <Image
          style={styles.img}
          source={
            image ? { uri: image } : require("../assets/original-image.jpg")
          }
        />
        <View style={styles.imagePickerContainer}>
          <Text style={styles.imagePickerText}>Select Image To Upload</Text>
          <TouchableOpacity
            style={styles.imagePickerBtnContainer}
            onPress={pickImage}
          >
            <Text style={styles.imagePickerBtnText}>Click to Select </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Video Name"
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <SelectDropdown
            data={pages}
            onSelect={(selectedItem, index) => {
              setPage(selectedItem);
            }}
            defaultButtonText="Select Facebook Page"
            buttonTextStyle={{ fontSize: 15 }}
            buttonStyle={{ width: "100%", backgroundColor: "white" }}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <SelectDropdown
            data={translators}
            onSelect={(selectedItem, index) => {
              setTranslator(selectedItem);
            }}
            defaultButtonText="Select Translator Name"
            buttonTextStyle={{ fontSize: 15 }}
            buttonStyle={{ width: "100%", backgroundColor: "white" }}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <SelectDropdown
            data={statuses}
            onSelect={(selectedItem, index) => {
              setStatus(index);
            }}
            defaultButtonText="Select Status"
            buttonTextStyle={{ fontSize: 15 }}
            buttonStyle={{ width: "100%", backgroundColor: "white" }}
          />
        </View>
        <TouchableOpacity style={styles.submitContainer} onPress={submitData}>
          <Text style={styles.submitText}>Submit Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    width: "100%",
    height: 100,
    backgroundColor: "#463DAE",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "white",
    marginLeft: 20,
    marginTop: 10,
  },
  detailContainer: {
    width: "100%",
  },
  img: {
    width: 260,
    height: 150,
    alignSelf: "center",
    marginVertical: 20,
  },
  inputContainer: {
    width: "100%",
    padding: 20,
    height: 80,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  inputTitle: {
    marginLeft: 10,
    marginBottom: 5,
    color: "grey",
    fontSize: 13,
  },
  input: {
    backgroundColor: "white",
    height: 50,
  },
  dropdownContainer: {
    width: "100%",
    padding: 20,
    height: 80,
    flexDirection: "row",
    justifyContent: "center",
  },
  submitContainer: {
    width: 120,
    height: 40,
    borderRadius: 20,
    margin: 40,
    backgroundColor: "#463DAE",
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  imagePickerContainer: {
    width: "100%",
    paddingHorizontal: 20,
    height: 40,
    marginTop: 10,
    flexDirection: "row",
    transform: [{ translateY: 0 }],
    alignItems: "center",
  },
  imagePickerText: {
    fontSize: 13,
    color: "grey",
  },
  imagePickerBtnContainer: {
    width: 120,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    backgroundColor: "red",
  },
  imagePickerBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: "white",
  },
});

export default AddItemScreen;
