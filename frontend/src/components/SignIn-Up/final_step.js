import { StyleSheet, View } from "react-native";
import LabelInput from "./label-input";
import { useState } from "react";

export const FinalStep = ({ password, setPassword }) => {
  return (
    <View style={{ marginTop: 20 }}>
      <LabelInput
        label={"비밀번호"}
        value={password}
        onChangeText={setPassword}
        textStyle={styles.labelInput_txt}
        itemStyle={{ marginBottom: 20 }}
        labelStyle={{ fontSize: 16, fontWeight: "500", marginBottom: 5 }}
        placeholder={"Sunt cupidatat qui do anim."}
        secure={true}
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
