import { StyleSheet, Text, View } from "react-native";
import LabelInput from "./label-input";
import { useState } from "react";

export const FirstStep = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
}) => {
  return (
    <View style={{ marginTop: 20 }}>
      <LabelInput
        label={"*성"}
        value={firstName}
        onChangeText={setFirstName}
        textStyle={styles.labelInput_txt}
        itemStyle={{ marginBottom: 20 }}
        labelStyle={{ fontSize: 16, fontWeight: "500", marginBottom: 5 }}
        placeholder={"Sunt cupidatat qui do anim."}
      />

      <LabelInput
        label={"*이름"}
        value={lastName}
        onChangeText={setLastName}
        textStyle={styles.labelInput_txt}
        itemStyle={{ marginBottom: 20 }}
        labelStyle={{ fontSize: 16, fontWeight: "500", marginBottom: 5 }}
        placeholder={"Sunt cupidatat qui do anim."}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  labelInput_txt: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    width: 250,
  },
});
