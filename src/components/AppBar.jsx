import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundColor,
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      {
        <Pressable>
          <Text color="textSecondary" fontWeight="bold" fontSize="subheading">
            Repositories
          </Text>
        </Pressable>
      }
    </View>
  );
};

export default AppBar;
