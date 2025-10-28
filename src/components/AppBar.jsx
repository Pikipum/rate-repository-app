import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/client";
import { CURRENT_USER } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

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
  const user = useQuery(CURRENT_USER);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const handleLogout = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

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
            {user.data?.me ? (
              <Pressable onPress={handleLogout}>
                <Text
                  color="textSecondary"
                  fontWeight="bold"
                  fontSize="subheading"
                >
                  Sign out
                </Text>
              </Pressable>
            ) : (
              <Link to="/signin" style={styles.link} component={Pressable}>
                <Text
                  color="textSecondary"
                  fontWeight="bold"
                  fontSize="subheading"
                >
                  Sign in
                </Text>
              </Link>
            )}
          </View>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
