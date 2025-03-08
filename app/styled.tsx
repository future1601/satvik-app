import React from 'react';
import { StyleSheet, Text, View, ViewProps, TextProps } from 'react-native';

// Basic styled components that don't rely on NativeWind
export function StyledView(props: ViewProps & { className?: string }) {
  const { style, className, ...otherProps } = props;
  
  // Here we would normally parse the className, but for now we'll use basic styles
  return <View style={[styles.view, style]} {...otherProps} />;
}

export function StyledText(props: TextProps & { className?: string }) {
  const { style, className, ...otherProps } = props;
  
  // Here we would normally parse the className, but for now we'll use basic styles
  return <Text style={[styles.text, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
  },
});

// Default export for the module
export default function StyledComponents() {
  return (
    <StyledView>
      <StyledText>Example Text</StyledText>
    </StyledView>
  );
} 