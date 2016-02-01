/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert
} from 'react-native';

var GoogleSignin = require('react-native-google-signin');
var { DeviceEventEmitter } = require('react-native');

class googleSignin extends Component {

  componentDidMount() {
    this._configureOauth();
  }
  _configureOauth(clientId, scopes=[]) {
    GoogleSignin.configure(
      "248111350340-q88ll63sj4inaunmj98p9q3g92dvrme0.apps.googleusercontent.com", //client ID from your backend server (Web type)
      [], // additional scopes (email is the default)
    );

    DeviceEventEmitter.addListener('googleSignInError', (error) => {
      console.log('ERROR signin in', error);
      Alert.alert('Alert Title', JSON.stringify(error))
    });

    DeviceEventEmitter.addListener('googleSignIn', (user) => {
      console.log(user);
      Alert.alert('Alert Title', JSON.stringify(user))
      //this.setState({user: user});
    });

    return true;
  }

  _signIn() {
    GoogleSignin.signIn();
  }

  _signOut() {
    GoogleSignin.signOut();
    //this.setState({user: null});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
        <TouchableHighlight style={styles.loginButton} onPress={() => {this._signIn(); }}>
          <Text style={styles.instructions}>{'Sign In'}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.loginButton} onPress={() => {this._signOut(); }}>
          <Text style={styles.instructions}>{'signOut'}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  loginButton: {
    padding: 5,
    marginVertical: 5,
    backgroundColor: 'gray'
  }
});

AppRegistry.registerComponent('googleSignin', () => googleSignin);
