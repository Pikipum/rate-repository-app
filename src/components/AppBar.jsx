import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundColor,
    flexDirection: "column",
  },
  linksRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  link: {
    marginRight: 20,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {
          <View style={styles.linksRow}>
            <Link to="/" style={styles.link} component={Pressable}>
              <Text
                color="textSecondary"
                fontWeight="bold"
                fontSize="subheading"
              >
                Repositories
              </Text>
            </Link>
            <Link to="/signin" style={styles.link} component={Pressable}>
              <Text
                color="textSecondary"
                fontWeight="bold"
                fontSize="subheading"
              >
                Sign in
              </Text>
            </Link>
          </View>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
