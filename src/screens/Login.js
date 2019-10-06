import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity
} from "react-native";
import { connect } from 'react-redux';
import { isEmail } from '../util/util';
import { ChangeValue, AuthenticationUser } from '../actions/AuthenticationAction';
import { TextField } from "react-native-material-textfield";
import ButtonCustom from "../components/ButtonCustom";
import fonts from "../styles/fonts";
import colors from "../styles/colors";
import logo from "../images/logo.png";
import InputScrollView from "react-native-input-scroll-view";
import AsyncStorage from "@react-native-community/async-storage";

var width = Dimensions.get("window").width;

class Login extends Component {

  constructor() {
    super();
    this.state = {
      errors: {}
    }

    this.emailRef = this.updateRef.bind(this, 'email');
    this.passwordRef = this.updateRef.bind(this, 'password');
  }

  componentWillMount = async () => {
    let token = await AsyncStorage.getItem("token")

    console.log("token", token)
    if (token != "") {
      global.token = token;
      Actions.feed();
    }

    this.setState({ loading: false })
  }

  onChangeText = (text) => {
    ['email', 'password']
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.props.ChangeValue(name, text)
        }
      });
  }

  onFocus = () => {
    let { errors = {} } = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }
    this.setState({ errors });
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  onSubmitEmail = () => {
    this.email.focus();
  }

  onSubmitPassword = () => {
    this.password.blur();
  }

  onSubmit = () => {
    const { email, password } = this.props;

    let errors = {};
    let valid = true;

    ['email', 'password']
      .forEach((name) => {
        let value = this.props[name];

        if (!value) {
          errors[name] = 'Cannot be empty';
          valid = false;
        } else {
          if ('password' === name && value.length < 6) {
            errors[name] = 'Too short';
            valid = false;
          }
        }
        this.setState({ errors });
      });

    if (valid) {
      this.props.AuthenticationUser(email, password);
    }
  }

  validateEmail = (email) => {
    let { errors } = this.state;

    if (!isEmail(email) && email != "") {
      console.log("isvalid", isEmail(email))
      errors["email"] = 'E-mail is not valid';
    }
  }

  render() {
    let { errors = {} } = this.state;

    const content = (
        <View style={styles.container}>
          <View style={styles.viewLogo}>
            <Image style={styles.logo} source={logo} resizeMode="contain" />
          </View>

          <View style={styles.formLogin}>
            <TextField
              label='E-mail'
              baseColor={colors.white2}
              textColor={colors.white2}
              ref={this.emailRef}
              blur={this.checkEmail}
              onBlur={() => { this.validateEmail(this.props.email) }}
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              value={this.props.email}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              returnKeyType='next'
              onSubmitEditing={() => this.password.focus()}
              error={errors.email}
            />

            <TextField
              label='Password'
              value={this.props.password}
              baseColor={colors.white2}
              textColor={colors.white2}
              ref={this.passwordRef}
              autoCapitalize="none"
              secureTextEntry={!this.props.showPassword}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              returnKeyType='done'
              onSubmitEditing={this.onSubmit}
              error={errors.password}
              maxLength={30}
            />

            <TouchableOpacity onPress={() => this.props.ChangeValue("showPassword", !this.props.showPassword)}>
              <Text style={{flex: 1, alignSelf: 'flex-end'}}>Monstrar</Text>
            </TouchableOpacity>
            

            <Text style={styles.messageErro}>{this.props.messageErr}</Text>

          </View>

          <View style={styles.viewFooter}>
            <ButtonCustom
                onPress={() => {
                  this.onSubmit();
                }}
                text={"LOGIN"}
                disable={this.props.loading}
                loading={this.props.loading}
              />
          </View>
      </View>
    )

    return (
      <View style={{backgroundColor: colors.white}}>
        <StatusBar backgroundColor={"transparent"} translucent barStyle={"dark-content"} />
        <InputScrollView style={{flex: 1}} keyboardShouldPersistTaps="handled">{content}</InputScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  viewLogo: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 30,
  },
  logo: {
    paddingHorizontal: 30
  },
  formLogin: {
    flex: 2,
    width: width * 0.8,
    justifyContent: "center",
    paddingVertical: 10,
  },
  viewFooter: {
    flex: 1,
    width: width,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignContent: 'center'
  },
  messageErro: {
    textAlign: 'center',
    fontFamily: fonts.bold,
    color: 'red',
    marginVertical: 20
  }
});

const mapStateToProps = state => (
  {
    email: state.AuthenticationReducers.email,
    password: state.AuthenticationReducers.password,
    loading: state.AuthenticationReducers.loading,
    messageErr: state.AuthenticationReducers.messageErr,
    showPassword: state.AuthenticationReducers.showPassword,
  }
)

export default connect(mapStateToProps, { ChangeValue, AuthenticationUser })(Login);