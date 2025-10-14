import Text from "./Text";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useFormik, yupToFormErrors } from "formik";
import * as yup from "yup";

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
  inputError: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#d73a4a",
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
  error: {
    color: "#d73a4a",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must be longer than 4 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must have at least 6 characters")
    .required("Password is required"),
});

const SignIn = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.separator}>
      <TextInput
        style={formik.errors.username ? styles.inputError : styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={formik.errors.password ? styles.inputError : styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.login}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
