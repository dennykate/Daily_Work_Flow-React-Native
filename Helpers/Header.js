import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

//import dependencies
import Ionicons from "react-native-vector-icons/Ionicons";

const Header = ({ title, addItem, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {addItem ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddItemScreen");
          }}
        >
          <Ionicons
            name="add-circle-outline"
            size={35}
            color="#f5f5f5"
            style={styles.addItem}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    backgroundColor: "grey",
    borderBottomColor: "grey",
    borderBottomWidth: 0.2,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "white",
    marginLeft: 20,
    marginTop: 10,
  },
  addItem: {
    marginTop: 20,
    marginRight: 20,
  },
});

export default Header;
