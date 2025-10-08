import { View } from "react-native-web";
import { Text, StyleSheet, StatusBar } from "react-native-web";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#feffc2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 12,
  },
});

const RepositoryItem = ({ repository }) => (
  <View style={styles.item}>
    <Text>Full name: {repository.fullName}</Text>
    <Text>Description: {repository.description}</Text>
    <Text>Language: {repository.language}</Text>
    <Text>Stars: {repository.stargazersCount}</Text>
    <Text>Forks: {repository.forksCount}</Text>
    <Text>Reviews: {repository.reviewCount}</Text>
    <Text>Rating: {repository.ratingAverage}</Text>
  </View>
);

export default RepositoryItem;
