import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import ToDoDashboard from './src/features/toDoList/dashboard/ToDoDashboard';


export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.anyItem}>
      
      <ToDoDashboard/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cccccc',
    alignItems: 'stretch',    
    textShadowColor:'#585858',
    textShadowOffset:{width: 3, height: 3},
    textShadowRadius:12,
    
    // justifyContent: 'center',
    // border: '6px ridge rgba(211, 220, 50, .6)'
  },
  anyItem: {
    
    marginTop: 30,
    margin: 5
  }
});
