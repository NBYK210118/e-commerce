import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ProductApi from '../services/product_api';
import { useCallback, useEffect, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { useSelector } from 'react-redux';

export const useLikeStates = () => {
  const [visibleOption, setVisibleOption] = useState(false);
  const [dataSet, setDataSet] = useState(null || []);
  const [activeMenu, setActiveMenu] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [likesStatus, setLikesStatus] = useState({});
  const navigation = useNavigation();
  const { user, token } = useSelector((state) => state.userAuth);
  const { categories, loading } = useSelector((state) => state.products);
  const borderWidths = [...Array(categories.length)].map(() => useSharedValue(0));

  useFocusEffect(
    useCallback(() => {
      if (token && !visibleOption) {
        ProductApi.getUserLikes(token).then((response) => {
          setDataSet(response.data);
        });
      } else {
      }
    }, [navigation, visibleOption])
  );

  useEffect(() => {
    if (dataSet.length > 0) {
      setLikesStatus(
        dataSet.reduce((acc, val) => {
          acc[val.id] = val.likedBy.some((like) => like.userId === user.id);
          return acc;
        }, {})
      );
    }
  }, [dataSet]);

  useEffect(() => {
    if (token && selectedMenu !== undefined && selectedMenu !== '') {
      ProductApi.getUserLikesByCategory(token, selectedMenu).then((response) => {
        setDataSet(response.data);
      });
      setVisibleOption(true);
    }
  }, [selectedMenu]);

  useFocusEffect(
    useCallback(() => {
      if (!token) {
        navigation.navigate('Login');
      }
    }, [token, navigation])
  );

  const toggleLike = (product) => {
    const condition = Object.keys(likesStatus).length > 0;
    const data = {
      ...likesStatus,
      [product.id]: !likesStatus[product.id],
    };

    setLikesStatus(data);

    if (token && condition) {
      ProductApi.updatelikeProduct(token, data).then((response) => {
        setDataSet(response.data.products);
      });
    }
  };

  const handleShowAll = () => {
    setVisibleOption(false);
    setSelectedMenu('');
    setActiveMenu(null);
  };

  return {
    activeMenu,
    setActiveMenu,
    setSelectedMenu,
    categories,
    borderWidths,
    dataSet,
    likesStatus,
    toggleLike,
    visibleOption,
    setVisibleOption,
    handleShowAll,
  };
};
