import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farm Standz</Text>
      <Text style={styles.subtitle}>Find fresh food near you.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    marginTop: 8,
  },
});
