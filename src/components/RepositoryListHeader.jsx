import { Searchbar } from "react-native-paper";

const RepositoryListHeader = ({ searchQuery, setSearchQuery }) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};

export default RepositoryListHeader;
