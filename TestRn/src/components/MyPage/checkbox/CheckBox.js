import Checkbox from 'expo-checkbox';
import React, { useCallback, useEffect, useState } from 'react';

export const CheckBox = ({ item, handleChecked, checkStatus }) => {
  return (
    <Checkbox
      value={checkStatus[item.id]}
      onValueChange={() => handleChecked(item.id)}
      color={checkStatus[item.id] ? '#0ea5e9' : '#6366f1'}
      style={{ padding: 2 }}
    />
  );
};

export default CheckBox;
