import './src/app/layout/styles/styles.css';
import 'react-datepicker/dist/react-datepicker.css'
import 'semantic-ui-css/semantic.min.css'
import { StyleSheet, Text, View } from 'react-native';
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom';
import ToDoDashboard from './src/features/toDoList/dashboard/ToDoDashboard';
import NavBar from './src/app/layout/NavBar';
import { Container } from 'semantic-ui-react';
import NotFound from './src/features/errors/NotFound';
export const history = createBrowserHistory();
export default function App() {
  return (
    <View style={styles.container}>      
      <Router history={history}>
        <Route exact path='/' component={ToDoDashboard} />
        <Route
        path={'/(.+)'}
        render={() => (
          <>
            
            <Container style={{ marginTop: '65px' }}>
              <Switch>
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )} />
      </Router>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
