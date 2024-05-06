import React from 'react';
import Animated from 'react-native-reanimated';
import { View, StyleSheet } from 'react-native';
import { BasketProduct } from './BasketProduct';
import { HeadRow } from './HeadRow';
import { InventoryModal } from './inventory_modal';
import { PayInfo } from './PayInfo';
import { PayInfoSkeleton } from './PayInfoSkeleton';
import { AnimatedBottomButton } from './AnimatedBottomPayBtn';
import { useBasketHooks } from '../../hooks/useBasketHooks';

export const ShoppingCart = () => {
  const {
    loading,
    animatedStyle,
    checkEntire,
    handleInventories,
    handleModal,
    handleScroll,
    modalStyle,
    productSummary,
    removeManyProducts,
    submitInventoryChanges,
    toggleCheckBox,
    toggleClose,
    entireCheck,
    modalOpen,
    products,
    quantity,
    selectedProducts,
    setModalOpen,
    setQuantity,
  } = useBasketHooks();
  return (
    <Animated.ScrollView style={styles.container} onScroll={handleScroll} scrollEventThrottle={16}>
      <View style={{ paddingBottom: 50 }}>
        <InventoryModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          quantity={quantity}
          setQuantity={setQuantity}
          onSubmitChange={submitInventoryChanges}
          touchSign={handleInventories}
        />
        <HeadRow
          count={products.length}
          value={entireCheck}
          onValueChange={checkEntire}
          onPress={checkEntire}
          removeMany={removeManyProducts}
        />
        {products.length > 0 &&
          products.map((item, index) => (
            <View style={styles.items} key={index}>
              <BasketProduct
                item={item}
                key={index}
                idx={index}
                status={selectedProducts}
                onCheck={toggleCheckBox}
                onClose={toggleClose}
                handleModal={handleModal}
              />
            </View>
          ))}
        {loading ? (
          <PayInfoSkeleton loadingStyle={animatedStyle} />
        ) : (
          <PayInfo productSummary={productSummary} productCount={products.length} />
        )}
      </View>
      <AnimatedBottomButton productSummary={productSummary} modalStyle={modalStyle} />
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 20,
    backgroundColor: 'rgba(236, 240, 241,1)',
  },
  items: { padding: 15, backgroundColor: 'white', marginVertical: 9 },
});
