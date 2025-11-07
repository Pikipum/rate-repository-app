import Text from "./Text";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useFormik, yupToFormErrors } from "formik";
import * as yup from "yup";
import useSignUp from "../hooks/useSignUp";
import { useNavigate } from "react-router-native";

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

export const SignUpContainer = ({ signUp, navigate }) => {
  const initialValues = { username: "", password: "", confirmPassword: "" };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(5, "Username must be longer than 5 characters")
      .max(30, "Username must be shorter than 30 characters")
      .required("Username is required"),
    password: yup
      .string()
      .min(5, "Password must have at least 5 characters")
      .max(50, "Password must be shorter than 50 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        setStatus(undefined);
        const data = await signUp({
          username: values.username,
          password: values.password,
        });
        if (data) {
          navigate("/", { replace: true });
        }
      } catch (e) {
        setStatus(e?.message || "Sign up failed");
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

      <TextInput
        style={
          touched.confirmPassword && errors.confirmPassword
            ? styles.inputError
            : styles.input
        }
        secureTextEntry
        placeholder="Confirm Password"
        autoCapitalize="none"
        value={values.confirmPassword}
        onChangeText={handleChange("confirmPassword")}
        onBlur={handleBlur("confirmPassword")}
        testID="passwordField"
      />
      {touched.confirmPassword && errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword}</Text>
      )}

      {status && <Text style={styles.error}>{status}</Text>}

      <Pressable onPress={handleSubmit} disabled={isSubmitting}>
        <Text style={styles.login}>
          {isSubmitting ? "Signing up..." : "Sign up"}
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  return <SignUpContainer signUp={signUp} navigate={navigate} />;
};

export default SignUp;
