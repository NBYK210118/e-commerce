import AsyncStorage from '@react-native-async-storage/async-storage';
import { http } from './axios.configure';

// 상품 정보 불러오기
const findProduct = async (id) => {
  try {
    const data = await http.get(`/product/?product_id=${id}`);
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 500:
          alert('서버 에러');
          break;
        case 400:
          alert('잘못된 요청');
          break;
      }
    } else {
      console.error('API call error: ', error);
    }
  }
};

// 상품 추가버튼 API
const addProduct = async (token, form) => {
  try {
    const data = await http.post('/product/my-store/add/product', form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          alert('Unauthorized');
          await AsyncStorage.clear();
          break;
        case 500:
          alert('서버 에러');
          break;
        case 400:
          alert('잘못된 요청');
          break;
      }
    } else {
      console.error('API call error: ', error);
    }
  }
};

// 상품 정보 업데이트 하기
const updateProduct = async (token, form, id) => {
  try {
    const data = await http.post(`/product/my-store/update-product/${id}`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          alert('Unauthorized');
          await AsyncStorage.clear();
          break;
        case 500:
          alert('서버 에러');
          break;
        case 400:
          alert('잘못된 요청!');
          break;
      }
    } else {
      console.error('API call error: ', error);
    }
  }
};

// 내 SellingList 의 검색바 기능
const findByProductByKeyword = async (token, keyword) => {
  try {
    console.log('keyword: ', keyword);
    const data = await http.get(`/sellinglist/find-product/?keyword=${keyword}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          alert('Unauthorized');
          await AsyncStorage.clear();
          break;
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

const getAllCategoryProducts = async (category) => {
  try {
    const data = await http.get(`/category/product/all/?category=${category}`);
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          alert('Unauthorized');
          await AsyncStorage.clear();
          break;
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

const getAllCategories = async () => {
  try {
    const data = await http.get('/category');
    return data;
  } catch (error) {
    if (error.response !== undefined) {
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

// SellingList 에서 선택한 카테고리의 상품들만 불러오기
const categoriesItem = async (token, category) => {
  try {
    const data = await http.get(`/category/product/?category=${category}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          await AsyncStorage.clear();
          alert('Unauthorized');
          break;
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

// 상품 페이지에서의 좋아요 상호작용 업데이트
const updatelikeProduct = async (token, likes) => {
  try {
    const data = await http.post('/like/islikeit', likes, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          await AsyncStorage.clear();
          alert('Unauthorized');
          break;
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

// PersonalStore에서 검색하기
const getProductByName = async (token, formdata, navigate) => {
  try {
    const data = await http.post('/product/my-store/searching', formdata, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          await AsyncStorage.clear();
          alert('Unauthorized');
          break;
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

// 유저의 찜 목록 가져오기
const fetchUserWishList = async (token, userId, navigate) => {
  try {
    const data = await http.get(`/wishlist/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          await AsyncStorage.clear();
          alert('Unauthorized');
          break;
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

// 특정 상품에 대한 사용자의 리뷰 업데이트
const updateReview = async (token, formData) => {
  try {
    const data = await http.post(`/review/update`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          await AsyncStorage.clear();
          alert('Unauthorized');
          break;
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

// 특정 상품에 대한 리뷰들 전부 불러오기
const getAllReviewsByProduct = async (productId) => {
  try {
    const data = await http.get(`/review/all?product_id=${productId}`);
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          await AsyncStorage.clear();
          alert('Unauthorized');
          break;
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

// 현재 상품 상세정보 페이지의 상품이 현재 사용자가 판매 등록한 상품인지 체크
const isUsersProduct = async (token, productId) => {
  try {
    const data = await http.get(`/product/is-users/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          await AsyncStorage.clear();
          alert('Unauthorized');
          break;
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

// 게스트가 상품을 봤을 때 조회수 상승
const guestViewed = async (productId) => {
  try {
    const data = await http.post(`/product/guest/viewed?productId=${productId}`);
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          alert('Unauthorized');
          break;
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

// 사용자가 상품을 봤을 때 조회수 상승
const userViewed = async (token, productId) => {
  try {
    console.log(productId);
    const data = await http.post(
      `/product/user/viewed?productId=${productId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          alert('Unauthorized');
          break;
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

// 사용자가 최근 본 상품들 불러오기
const userRecentWatched = async (token, navigation) => {
  try {
    const data = await http.get(`/viewedproduct/recent-watched`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          alert('Unauthorized');
          navigation.navigate('Login');
          break;
        case 500:
          alert('서버 에러');
          navigation.navigate('Home');
          break;
        case 400:
          alert('잘못된 요청!');
          navigation.navigate('Home');
          break;
        default:
          await AsyncStorage.clear();
          console.log('Unknown error', error);
      }
    } else {
      console.error('API call error: ', error);
    }
  }
};

// 조회수가 높은 상위 5개 상품들 불러오기
const getMostInterested = async (navigation) => {
  try {
    const data = await http.get('viewedproduct/recent-watched/every-products');
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 500:
          alert('서버 에러'); // 데이터 클리어
          navigation.navigate('Home'); // 홈으로 이동
          break;
        case 400:
          alert('잘못된 요청!'); // 데이터 클리어
          navigation.navigate('Home'); // 홈으로 이동
          break;
        default:
          await AsyncStorage.clear();
          console.log('Unknown error', error);
      }
    } else {
      console.error('API call error: ', error);
    }
  }
};

// 할인 중인 상품들 불러오기
const getDiscountingProducts = async (navigation) => {
  try {
    const data = await http.get('/product/all/discounting');
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
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

// 추천 상품 로드
const getRecommendProduct = async () => {
  try {
    const data = await http.get('/product/all/random-recommend');
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 500:
          console.log('서버 에러: 추천 상품 데이터를 로드해오지 못했습니다');
        case 400:
          console.log('잘못된 요청입니다');
      }
    }
  }
};

// 클릭한 페이지 또는 정렬 갯수에 따라 불러오는 상품들이 달라짐
const getProductsBypage = async (token, currentPage, itemsPage, navigate) => {
  try {
    const data = await http.get(`/product/my-store/everypage/?page=${currentPage}&limit=${itemsPage}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.clear();
      navigate('/signin');
    } else if (error.response.status === 400) {
      alert('잘못된 요청');
      localStorage.clear();
      navigate('');
    } else if (error.response.status === 500) {
      alert('서버 에러!');
      localStorage.clear();
      navigate('');
    }
  }
};

// 검색한 단어로 상품을 찾아내기
const getProductsBySearchKeyword = async (keyword, navigate) => {
  try {
    const data = await http.get(`/product/?search_keyword=${keyword}`);
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 500:
          console.log('서버 에러: 추천 상품 데이터를 로드해오지 못했습니다');
        case 400:
          console.log('잘못된 요청입니다');
      }
    }
  }
};

// 내 장바구니 불러오기
const getMyBasket = async (token) => {
  try {
    const data = await http.get('/shoppingbasket', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 500:
          alert('서버 에러: 장바구니를 불러오지 못했습니다');
        case 400:
          alert('잘못된 요청');
        case 401:
          alert('권한 없음');
      }
    }
  }
};

// 장바구니 담기 버튼 클릭
const addProductMyBasket = async (token, productId, navigation) => {
  try {
    const data = await http.post(
      `/shoppingbasket/add/?product_id=${productId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          alert('권한 없음');
          navigation.navigate('Login');
          break;
        case 500:
          alert('서버 에러');
          break;
        case 400:
          alert('잘못된 요청');
          break;
      }
    } else {
      console.error('API call error: ', error);
    }
  }
};

// 장바구니에서 제거하기
const removeProductBasket = async (token, productId) => {
  try {
    const data = await http.post(
      `/shoppingbasket/remove/?product_id=${productId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          alert('권한 없음');
          break;
        case 500:
          alert('서버 에러');
          break;
        case 400:
          alert('잘못된 요청');
          break;
      }
    } else {
      console.error('API call error: ', error);
    }
  }
};

const removeManyProductInBasket = async (token, checkStatus) => {
  try {
    const data = await http.post('/shoppingbasket/remove/list', checkStatus, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          alert('권한 없음');
          break;
        case 500:
          alert('서버 에러');
          break;
        case 400:
          alert('잘못된 요청');
          break;
      }
    } else {
      console.error('API call error: ', error);
    }
  }
};

const updateProductStatus = async (token, form) => {
  try {
    const data = await http.put('/sellinglist/update/status', form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          alert('권한 없음');
          break;
        case 500:
          alert('서버 에러');
          break;
        case 400:
          alert('잘못된 요청');
          break;
      }
    } else {
      console.error('API call error: ', error);
    }
  }
};

const checkUserAlreadyReviewed = async (token, product_id) => {
  try {
    const data = await http.get(`/review/checking/users/${product_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 500:
          alert('서버 에러');
          break;
        case 400:
          alert('잘못된 요청');
          break;
      }
    } else {
      console.error('API call error: ', error);
    }
  }
};

const getUserLikes = async (token) => {
  try {
    const data = await http.get('/like/all', { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          alert('권한 없음');
        case 500:
          alert('서버 에러');
        case 400:
          alert('잘못된 요청');
      }
    }
  }
};

const getUserLikesByCategory = async (token, category) => {
  try {
    const data = await http.get(`/like/all/likes/?category=${category}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          alert('권한 없음');
          break;
        case 500:
          alert('서버 에러');
          break;
        case 400:
          alert('잘못된 요청');
          break;
      }
    }
  }
};

const updateProductQuantity = async (token, productId, quantity) => {
  try {
    const data = await http.post(
      `/shoppingbasket/update?productId=${productId}&quantity=${quantity}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return data;
  } catch (error) {
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          alert('권한 없음');
          break;
        case 500:
          alert('서버 에러');
          break;
        case 400:
          alert('잘못된 요청');
          break;
      }
    }
  }
};

const ProductApi = {
  findProduct,
  addProduct,
  updateProduct,
  categoriesItem,
  getAllCategoryProducts,
  getAllCategories,
  updatelikeProduct,
  fetchUserWishList,
  updateReview,
  getAllReviewsByProduct,
  isUsersProduct,
  guestViewed,
  userViewed,
  userRecentWatched,
  getProductByName,
  getMostInterested,
  getDiscountingProducts,
  getProductsBypage,
  getProductsBySearchKeyword,
  getMyBasket,
  addProductMyBasket,
  removeProductBasket,
  getRecommendProduct,
  updateProductStatus,
  findByProductByKeyword,
  checkUserAlreadyReviewed,
  getUserLikes,
  getUserLikesByCategory,
  removeManyProductInBasket,
  updateProductQuantity,
};

export default ProductApi;
