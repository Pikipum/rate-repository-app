import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import { View, Pressable } from "react-native";
import Text from "./Text";

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
});

const RepositoryView = () => {
  const id = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id: id.id },
  });

  if (!loading) {
    console.log(data);
    return (
      <View>
        <RepositoryItem repository={data.repository} />
        <Pressable onPress={() => Linking.openURL(data.repository.url)}>
          <Text style={styles.openButton}>{"Open in GitHub"}</Text>
        </Pressable>
      </View>
    );
  } else {
    return "Loading data...";
  }
};

export default RepositoryView;
