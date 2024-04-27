import { StyleSheet, View } from "react-native";
import LabelInput from "./label-input";
import { useState } from "react";

export const MidStep = ({ email, setEmail }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <LabelInput
        label={"이메일"}
        value={email}
        onChangeText={setEmail}
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
