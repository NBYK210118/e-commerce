import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { primary_gray } from "../../../styles/common/colors";
import { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { MenuBar } from "../../Home/menu_bar";
import { AntDesign } from "@expo/vector-icons";

let data = [
  "전체",
  "배송 일반",
  "기타",
  "예약 배송",
  "무탠 픽업",
  "주문제작 배송",
  "부티크 배송",
];

export const Contents = ({ currentMenu }) => {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const borderWidths = [...Array(data.length)].map(() => useSharedValue(0));

  return (
    <View>
      {currentMenu === "전체" && (
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              position: "relative",
              justifyContent: "space-around",
              alignItems: "center",
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: primary_gray,
            }}
          >
            <Text style={{ marginRight: 5, color: "gray" }}>탈퇴/기타</Text>
            <Text numberOfLines={2} style={{ overflow: "hidden" }}>
              회원 탈퇴는 어떻게 하나요?
            </Text>
            <TouchableOpacity>
              <AntDesign name="down" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: primary_gray,
            }}
          >
            <Text style={{ marginRight: 5, color: "gray" }}>로그인/정보</Text>
            <Text numberOfLines={2} style={{ overflow: "hidden" }}>
              아이디와 비밀번호가 기억나지 않아요
            </Text>
            <AntDesign name="down" size={24} color="black" />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: primary_gray,
              alignItems: "center",
            }}
          >
            <Text style={{ marginRight: 5, color: "gray", flex: 1 }}>
              상품 문의
            </Text>
            <Text numberOfLines={2} style={{ overflow: "hidden", flex: 3 }}>
              구매했을 때보다 가격이 떨어졌어요 차액 환불이 되나요?
            </Text>
            <AntDesign
              name="down"
              size={24}
              color="black"
              style={{ flex: 0.5 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: primary_gray,
            }}
          >
            <Text style={{ marginRight: 5, color: "gray" }}>배송 일반</Text>
            <Text numberOfLines={2} style={{ overflow: "hidden" }}>
              출고가 지연된다는 알림톡을 받았어요
            </Text>
            <AntDesign name="down" size={24} color="black" />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: primary_gray,
            }}
          >
            <Text style={{ marginRight: 5, color: "gray" }}>기타</Text>
            <Text numberOfLines={2} style={{ overflow: "hidden" }}>
              배송 완료 상품을 받지 못했어요
            </Text>
            <AntDesign name="down" size={24} color="black" />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: primary_gray,
            }}
          >
            <Text style={{ marginRight: 5, color: "gray" }}>배송 일반</Text>
            <Text numberOfLines={2} style={{ overflow: "hidden" }}>
              배송 조회는 어떻게 하나요?
            </Text>
            <AntDesign name="down" size={24} color="black" />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: primary_gray,
            }}
          >
            <Text style={{ marginRight: 5, color: "gray" }}>배송 일반</Text>
            <Text numberOfLines={2} style={{ overflow: "hidden" }}>
              고객 보상 지원 제도가 무엇인가요?
            </Text>
            <AntDesign name="down" size={24} color="black" />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: primary_gray,
            }}
          >
            <Text style={{ marginRight: 5, color: "gray" }}>배송 일반</Text>
            <Text numberOfLines={2} style={{ overflow: "hidden" }}>
              일반 배송 상품은 언제 배송되나요?
            </Text>
            <AntDesign name="down" size={24} color="black" />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: primary_gray,
            }}
          >
            <Text style={{ marginRight: 5, color: "gray" }}>
              취소/반품(환불)
            </Text>
            <Text numberOfLines={2} style={{ overflow: "hidden" }}>
              반송장을 입력하라고 하는데, 반송장 입력 버튼이 보이지 않아요
            </Text>
            <AntDesign name="down" size={24} color="black" />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: primary_gray,
            }}
          >
            <Text style={{ marginRight: 5, color: "gray" }}>교환/반품</Text>
            <Text numberOfLines={2} style={{ overflow: "hidden" }}>
              포장(택배) 박스, 상품/상품 박스가 파손되어 배송됐어요.
            </Text>
            <AntDesign name="down" size={24} color="black" />
          </View>
        </ScrollView>
      )}
      {currentMenu === "배송" && (
        <MenuBar
          active={active}
          setActive={setActive}
          color={"black"}
          menuValues={borderWidths}
          menus={data}
          setSelected={setSelected}
        />
      )}
    </View>
  );
};
