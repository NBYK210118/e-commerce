import AsyncStorage from '@react-native-async-storage/async-storage';
import { http } from './axios.configure';

const signIn = async (form) => {
  try {
    const data = await http.post('/user/signin', form);
    if (data === undefined) {
      console.log('response 가 비어있음');
    }
    return data;
  } catch (error) {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 500:
          alert('서버 에러');
          break;
        case 400:
          alert('잘못된 요청!');
          break;
        default:
          console.log('Unknown error', error);
      }
    } else {
      console.error('API call error: ', error);
    }
  }
};

const signUp = async (form) => {
  try {
    const data = await http.post('/user/signup', form);
    return data;
  } catch (error) {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 500:
          alert('서버 에러');
          await AsyncStorage.clear(); // 데이터 클리어
          break;
        case 400:
          alert('잘못된 요청!');
          await AsyncStorage.clear(); // 데이터 클리어
          break;
        default:
          console.log('Unknown error', error);
      }
    } else {
      console.error('API call error: ', error);
    }
  }
};

const getEmailUser = async (token) => {
  const data = await http.get('/user', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

const createProfile = async (form) => {
  const data = await http.post('/user/profile/create', form); // 운동 다녀와서 구현하기
  return data;
};

const getProfile = async (token) => {
  const data = await http.get('/user/my-profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

const verifyToken = async (token, navigation) => {
  try {
    const data = await http.get('/user/verify', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          alert('Unauthorized!');
          navigation.navigate('Login');
        case 500:
          alert('서버 에러');
          AsyncStorage.clear(); // 데이터 클리어
          navigation.navigate('Home'); // 홈으로 이동
          break;
        case 400:
          alert('잘못된 요청!');
          AsyncStorage.clear(); // 데이터 클리어
          navigation.navigate('Home'); // 홈으로 이동
          break;
        default:
          console.log('Unknown error', error);
      }
    } else {
      console.error('API call error: ', error);
    }
  }
};

const updateNickname = async (token, nickname) => {
  try {
    const data = await http.post('/user/my-profile/nickname', nickname, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log('Failed to update nickname', error);
  }
};

const uploadProfileImg = async (token, file) => {
  try {
    const data = await http.post('/user/my-profile/upload', file, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('Failed to upload Profile image', error);
    }
  }
};

const updateProfile = async (token, form, navigate) => {
  try {
    const data = await http.post('/user/my-profile/update', form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      alert('Unauthroized!');
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } else {
    }
    console.log('Failed to update Profile', error);
  }
};

const getSellinglist = async (token, limit) => {
  try {
    const data = await http.get(`/sellinglist/?limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          alert('권한 없음: 로그인 페이지로 이동합니다');
        case 500:
          alert('서버 에러');
          break;
        case 400:
          alert('잘못된 요청!');
          break;
        default:
          console.log('Unknown error', error);
      }
    } else {
      console.error('API call error: ', error);
    }
  }
};

const getProductsWhileUpdate = async (token, selectedList, navigate) => {
  try {
    const data = await http.post(`/user/my-store`, selectedList, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      alert('Unauthorized!');
      navigate('/signin');
    } else if (error.response.status === 400) {
      alert('잘못된 요청');
    } else if (error.response.status === 500) {
      alert('서버 에러');
      window.location.reload();
    }
  }
};

const deleteProduct = async (token, form) => {
  try {
    const data = await http.post('/user/my-store/delete-product', form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response.status === 500) {
      alert('서버에서 로드해오지 못함');
    } else {
      console.error('Failed to delete product: ', error);
    }
  }
};

const DataService = {
  signIn,
  signUp,
  createProfile,
  getProfile,
  getEmailUser,
  verifyToken,
  updateNickname,
  uploadProfileImg,
  updateProfile,
  deleteProduct,
  getProductsWhileUpdate,
  getSellinglist,
};

export default DataService;
