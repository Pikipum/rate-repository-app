import { View, Image, StyleSheet } from "react-native";
import { Text } from "react-native";

const styles = StyleSheet.create({
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
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 16,
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
  language: {
    alignSelf: "flex-start",
    backgroundColor: "#0366d6",
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: "hidden",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 0,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
  },
  statLabel: {
    color: "#586069",
    fontSize: 13,
  },
  divider: {
    height: 8,
    backgroundColor: "#e1e4e8",
    marginHorizontal: -16,
    marginBottom: 0,
    marginTop: 8,
  },
});

const formatNumber = (num) => {
  if (num < 1000) {
    return num;
  }
  return (num / 1000).toFixed(1).replace(".0", "") + "k";
};

const RepositoryItem = ({ repository }) => (
  <View>
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Image
          style={styles.avatar}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.info}>
          <Text style={styles.fullName}>{repository.fullName}</Text>
          <Text style={styles.description}>{repository.description}</Text>
          <Text style={styles.language}>{repository.language}</Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {formatNumber(repository.stargazersCount)}
          </Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {formatNumber(repository.forksCount)}
          </Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {formatNumber(repository.reviewCount)}
          </Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {formatNumber(repository.ratingAverage)}
          </Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </View>
    <View style={styles.divider} />
  </View>
);

export default RepositoryItem;
