import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { primary_gray } from '../../../styles/common/colors';

export const Stepper = ({
  active,
  content = [],
  onBack,
  onNext,
  onFinish,
  stepStyle,
  buttonContainer,
  buttonStyle,
  buttonTextStyle,
}) => {
  if (content.length < 1) {
    return null;
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: content.length > 1 ? 'space-around' : 'center' }}>
        {content.map((_, idx) => (
          <View
            key={idx}
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
              backgroundColor: active === idx ? '#4aa8d8' : '#e5f1f5',
            }}
          >
            <Text style={{ textAlign: 'center', lineHeight: 30, color: 'white' }}>{idx + 1}</Text>
          </View>
        ))}
      </View>

      <View key={`content-${active}`}>{content[active]}</View>

      <View style={buttonContainer}>
        {active > 0 && (
          <TouchableOpacity onPress={onBack} style={buttonStyle}>
            <Text style={buttonTextStyle}>Back</Text>
          </TouchableOpacity>
        )}
        {active !== content.length - 1 && (
          <TouchableOpacity onPress={onNext} style={buttonStyle}>
            <Text style={buttonTextStyle}>Next</Text>
          </TouchableOpacity>
        )}
        {active === content.length - 1 && (
          <TouchableOpacity onPress={onFinish} style={buttonStyle}>
            <Text style={buttonTextStyle}>Finish</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
