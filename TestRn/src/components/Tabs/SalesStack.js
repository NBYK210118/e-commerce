import { Stack } from '.';

export const SalesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SalesList" component={Sales} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
