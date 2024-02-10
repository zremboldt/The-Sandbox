import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';

export default function App() {
  return (
      <WebView source={{uri: 'https://www.google.com'}} />
  );
}

// const styles = StyleSheet.create({
//   webView: {},
// });


{/* <View style={styles.container}>
  <Text>Open up App.js to start working on your app!</Text>
  <StatusBar style="auto" />
</View> */}