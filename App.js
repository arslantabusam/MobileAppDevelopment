import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

class Login extends App {
  render(){
  return (
    <View style={styles.container}>
      <Text>This is my app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});