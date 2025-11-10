import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import RepositoryListHeader from "./RepositoryListHeader";
import { useDebounce } from "use-debounce";

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
  searchQuery,
  setSearchQuery,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderHeader = (searchQuery, setSearchQuery) => {
    return (
      <RepositoryListHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    );
  };

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
        ListHeaderComponent={renderHeader(searchQuery, setSearchQuery)}
      />
    </>
  );
};

const RepositoryList = () => {
  const [selectedFilter, setSelectedFilter] = useState("LATEST");
  const [searchQuery, setSearchQuery] = useState("");
  const [value] = useDebounce(searchQuery, 500);
  const navigate = useNavigate();
  const { repositories } = useRepositories(selectedFilter, value);

  return (
    <RepositoryListContainer
      selectedFilter={selectedFilter}
      setSelectedFilter={setSelectedFilter}
      navigate={navigate}
      repositories={repositories}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default RepositoryList;
