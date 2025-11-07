import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerContainer: {
    backgroundColor: "#e1e4e8",
    padding: 15,
  },
  picker: {
    backgroundColor: "white",
    borderRadius: 4,
    marginHorizontal: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  setSelectedFilter,
  selectedFilter,
  navigate,
  repositories,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedFilter}
          onValueChange={(itemValue) => setSelectedFilter(itemValue)}
        >
          <Picker.Item label="Latest repositories" value="LATEST" />
          <Picker.Item
            label="Highest rated repositories"
            value="HIGHEST_RATED"
          />
          <Picker.Item label="Lowest rated repositories" value="LOWEST_RATED" />
        </Picker>
      </View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/${item.id}`)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

const RepositoryList = () => {
  const [selectedFilter, setSelectedFilter] = useState("LATEST");
  const navigate = useNavigate();
  const { repositories } = useRepositories(selectedFilter);

  return (
    <RepositoryListContainer
      selectedFilter={selectedFilter}
      setSelectedFilter={setSelectedFilter}
      navigate={navigate}
      repositories={repositories}
    />
  );
};

export default RepositoryList;
