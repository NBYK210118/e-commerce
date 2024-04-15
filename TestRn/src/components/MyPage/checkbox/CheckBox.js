import Checkbox from 'expo-checkbox';
import React, { useCallback, useEffect, useState } from 'react';

export const CheckBox = ({ products = [], item }) => {
  const [checkStatus, setCheckStatus] = useState({});

  useEffect(() => {
    if (products.length > 0) {
      setCheckStatus(
        products.reduce((acc, val) => {
          acc[val.id] = false;
          return acc;
        }, {})
      );
    }
  }, [products]);

  const handleChecked = useCallback(
    (product_id) => {
      setCheckStatus((prevState) => ({
        ...prevState,
        [product_id]: !prevState[product_id],
      }));
    },
    [setCheckStatus]
  );

  return (
    <Checkbox
      value={checkStatus[item.id]}
      onValueChange={() => handleChecked(item.id)}
      color={checkStatus[item.id] ? '#0ea5e9' : '#6366f1'}
      style={{ padding: 2 }}
    />
  );
};

export default React.memo(CheckBox);
