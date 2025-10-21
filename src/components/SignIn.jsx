import Text from "./Text";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useFormik, yupToFormErrors } from "formik";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";

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

const initialValues = { username: "", password: "" };

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

const SignIn = ({ accessStorage }) => {
  const [signIn] = useSignIn();

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        setStatus(undefined);
        const data = await signIn({
          username: values.username,
          password: values.password,
        });
        console.log(data);
        await accessStorage.setAccessToken(data.accessToken);
      } catch (e) {
        setStatus(e?.message || "Sign in failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    isSubmitting,
    status,
  } = formik;

  return (
    <View style={styles.separator}>
      <TextInput
        style={
          touched.username && errors.username ? styles.inputError : styles.input
        }
        placeholder="Username"
        autoCapitalize="none"
        value={values.username}
        onChangeText={handleChange("username")}
        onBlur={handleBlur("username")}
        testID="usernameField"
      />
      {touched.username && errors.username && (
        <Text style={styles.error}>{errors.username}</Text>
      )}

      <TextInput
        style={
          touched.password && errors.password ? styles.inputError : styles.input
        }
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
        value={values.password}
        onChangeText={handleChange("password")}
        onBlur={handleBlur("password")}
        testID="passwordField"
      />
      {touched.password && errors.password && (
        <Text style={styles.error}>{errors.password}</Text>
      )}

      {status && <Text style={styles.error}>{status}</Text>}

      <Pressable onPress={handleSubmit} disabled={isSubmitting}>
        <Text style={styles.login}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
