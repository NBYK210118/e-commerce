import { LinearGradient } from 'expo-linear-gradient';
export const primary_blue = 'rgb(59 130 246)';
export const blue1 = '#0067a3';
export const blue2 = 'rgba(0,50,150,1)';
export const skyblue = 'rgba(10,150,240,1)';

export const gray1 = '#e3e3e3';
export const primary_gray = '#cfcfcf';

export const orange = '#ff7f00';

export const red = 'rgba(150,20,0,1)';

export const light_green = '#24a424';
export const HeaderGradient = () => {
  return (
    <LinearGradient colors={['#0ea5e9', '#6366f1']} style={{ flex: 1 }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
  );
};
