import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import './App.css';
import './bootstrap.min.css';

import Header from "./components/Header/Header";
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import ProfilesScreen from './screens/ProfilesScreen/ProfilesScreen';
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import UsersScreen from './screens/UsersScreen/UsersScreen';
import UserScreen from './screens/UserScreen/UserScreen';
import { useSelector } from 'react-redux';


const App = () => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const returnPath = (authPath, unAuthPath) => {
      return (
        userInfo ?
        <Redirect to={authPath} /> :
        <Redirect to={unAuthPath} /> 
      )
    }


  return (
    <Router>
    <Header />
    <main className="py-3">
      <Container>
        <Route
            exact
            path="/"
            render={() => returnPath('/profiles', '/login')}
          />
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/profiles' component={ProfilesScreen} />
        <Route path='/dashboard' component={DashboardScreen} />
        <Route path='/users' component={UsersScreen} exact/>
        <Route path='/users/:id' component={UserScreen} />
      </Container>
    </main>
  </Router>

  );
}

export default App;
