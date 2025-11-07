import Text from "./Text";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import useSubmitReview from "../hooks/useSubmitReview";
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

export const ReviewFormContainer = ({ submitReview, navigate }) => {
  const initialValues = {
    ownerName: "",
    repositoryName: "",
    rating: "",
    text: "",
  };

  const validationSchema = yup.object().shape({
    ownerName: yup.string().required("Repository owner is required"),
    repositoryName: yup.string().required("Repository name is required"),
    rating: yup.number().required("Rating is required").min(1).max(100),
    text: yup.string(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        setStatus(undefined);
        const data = await submitReview({
          ownerName: values.ownerName,
          repositoryName: values.repositoryName,
          rating: Number(values.rating),
          text: values.text,
        });
        if (data) {
          navigate(`/${data.repository.id}`, { replace: true });
        }
      } catch (e) {
        setStatus(e?.message || "Submitting review failed");
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
          touched.ownerName && errors.ownerName
            ? styles.inputError
            : styles.input
        }
        placeholder="Repository owner"
        autoCapitalize="none"
        value={values.ownerName}
        onChangeText={handleChange("ownerName")}
        onBlur={handleBlur("ownerName")}
        testID="repositoryOwnerField"
      />
      {touched.ownerName && errors.ownerName && (
        <Text style={styles.error}>{errors.ownerName}</Text>
      )}

      <TextInput
        style={
          touched.repositoryName && errors.repositoryName
            ? styles.inputError
            : styles.input
        }
        placeholder="Repository Name"
        autoCapitalize="none"
        value={values.repositoryName}
        onChangeText={handleChange("repositoryName")}
        onBlur={handleBlur("repositoryName")}
        testID="repositoryNameField"
      />
      {touched.repositoryName && errors.repositoryName && (
        <Text style={styles.error}>{errors.repositoryName}</Text>
      )}

      <TextInput
        style={
          touched.rating && errors.rating ? styles.inputError : styles.input
        }
        placeholder="Rating"
        autoCapitalize="none"
        value={values.rating}
        onChangeText={handleChange("rating")}
        onBlur={handleBlur("rating")}
        testID="ratingField"
      />
      {touched.rating && errors.rating && (
        <Text style={styles.error}>{errors.rating}</Text>
      )}

      <TextInput
        style={touched.text && errors.text ? styles.inputError : styles.input}
        placeholder="text"
        autoCapitalize="none"
        value={values.text}
        onChangeText={handleChange("text")}
        onBlur={handleBlur("text")}
        testID="textField"
      />
      {touched.text && errors.text && (
        <Text style={styles.error}>{errors.text}</Text>
      )}

      {status && <Text style={styles.error}>{status}</Text>}

      <Pressable onPress={handleSubmit} disabled={isSubmitting}>
        <Text style={styles.login}>
          {isSubmitting ? "Submitting..." : "Submit review"}
        </Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const [submitReview] = useSubmitReview();
  const navigate = useNavigate();

  return (
    <ReviewFormContainer submitReview={submitReview} navigate={navigate} />
  );
};

export default ReviewForm;
