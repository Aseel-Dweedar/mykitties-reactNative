import React, { useState } from "react";
import colors from "../assets/colors/colors";
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import AuthScreens from "../components/AuthScreens";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import axios from "axios";

const API_URL = process.env.API_URL;

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeUsername = (value) => {
    setUsername(value);
  };
  const onChangeFirstName = (value) => {
    setFirstName(value);
  };
  const onChangeLastName = (value) => {
    setLastName(value);
  };
  const onChangePassword = (value) => {
    setPassword(value);
  };
  const onChangePhone = (value) => {
    setPhone(value);
  };
  const onChangeEmail = (value) => {
    setEmail(value);
  };

  const signUpBtnEvent = () => {
    if (username && firstName && lastName && password && phone && email) {
      setIsLoading(true);
      axios
        .post(`${API_URL}/user`, { username, firstName, lastName, password, email, phone })
        .then((axiosResponse) => {
          setIsLoading(false);
          setIsLoading(false);
          alert(axiosResponse.data);
          navigation.navigate("SignIn");
        })
        .catch((err) => {
          setIsLoading(false);
          alert("An error happens!! please try again later");
        });
    } else {
      alert("Please Fill All Fields!");
    }
  };

  const moveToSignIn = () => {
    navigation.navigate("SignIn");
  };

  let inputDiv;
  if (isLoading) {
    inputDiv = (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
        <ActivityIndicator color={colors.secondary} size="large" />
      </View>
    );
  } else {
    inputDiv = (
      <View style={styles.InputContainer}>
        <InputField placeholder="User name" name="users" onChangeText={onChangeUsername} value={username} />
        <InputField placeholder="First Name" name="user" onChangeText={onChangeFirstName} value={firstName} />
        <InputField placeholder="Last Name" name="user-o" onChangeText={onChangeLastName} value={lastName} />
        <InputField placeholder="Password" name="lock" onChangeText={onChangePassword} value={password} />
        <InputField placeholder="E-mail" name="envelope" onChangeText={onChangeEmail} value={email} />
        <InputField placeholder="Phone" name="phone" onChangeText={onChangePhone} value={phone} placeholder="+962" />
      </View>
    );
  }

  return (
    <AuthScreens>
      <View style={styles.container}>
        {inputDiv}
        <CustomButton title="Sign-Up" btn={styles.btn} btnText={styles.btnText} onPress={signUpBtnEvent} />
        <View style={styles.textContainer}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={moveToSignIn}>
            <Text style={styles.signUp}>Sign-In!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthScreens>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  InputContainer: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    backgroundColor: colors.secondary,
    width: "50%",
    marginVertical: 10,
  },
  btnText: {
    color: colors.primary,
  },
  textContainer: {
    flexDirection: "row",
  },
  signUp: {
    color: colors.primary,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  iconContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
});

export default SignUp;
