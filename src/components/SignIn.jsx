import { TextInput } from "react-native-web";
import Text from "./Text";
import { View } from "react-native-web";
import { Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";

const styles = StyleSheet.create({
  separator: {
    backgroundColor: "white",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  login: {
    alignSelf: "flex-start",
    height: 40,
    margin: 12,
    backgroundColor: "#0366d6",
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 4,
    overflow: "hidden",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const SignIn = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <View style={styles.separator}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.login}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
