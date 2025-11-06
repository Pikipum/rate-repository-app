import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import { View, Pressable } from "react-native";
import Text from "./Text";
import { useParams } from "react-router-native";
import { FlatList } from "react-native";

const styles = StyleSheet.create({
  separator: {
    backgroundColor: "white",
  },
  openButton: {
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
  card: {
    backgroundColor: "white",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 0,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  info: {
    flex: 1,
    flexDirection: "column",
  },
  fullName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: "#586069",
    marginBottom: 8,
    fontSize: 14,
  },
  reviewRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  ratingColumn: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  ratingCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#0366d6",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  ratingText: {
    color: "#0366d6",
    fontWeight: "bold",
    fontSize: 20,
  },
  reviewContent: {
    flex: 1,
    marginLeft: 12,
  },
  usernameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  usernameText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  dateText: {
    color: "#586069",
    fontSize: 12,
  },
  reviewText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: "#24292e",
  },
});

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem repository={repository} />
      <Pressable onPress={() => Linking.openURL(repository.url)}>
        <Text style={styles.openButton}>{"Open in GitHub"}</Text>
      </Pressable>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.card}>
      <View style={styles.reviewRow}>
        <View style={styles.ratingColumn}>
          <View style={styles.ratingCircle}>
            <Text style={styles.ratingText}>{review.rating}</Text>
          </View>
        </View>
        <View style={styles.reviewContent}>
          <View style={styles.usernameRow}>
            <Text style={styles.usernameText}>{review.user.username}</Text>
            <Text style={styles.dateText}>{formatDate(review.createdAt)}</Text>
          </View>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const id = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id: id.id },
  });

  if (loading) return <Text>Loading...</Text>;

  const reviews = data.repository.reviews
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryInfo repository={data.repository} />
      )}
      // ...
    />
  );
};

export default SingleRepository;
