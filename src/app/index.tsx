import * as Location from "expo-location";
import { GoogleMaps } from "expo-maps";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  useEffect(() => {
    async function checkLocation() {
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    }

    checkLocation();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Roadside Standz</Text>
      <Text style={styles.subtitle}>Find something local.</Text>
      <Text style={styles.tagline}>Fresh • Homemade • Delicious</Text>

      <GoogleMaps.View
        style={styles.map}
        cameraPosition={{
          coordinates: {
            latitude: location?.coords.latitude ?? 44.9778,
            longitude: location?.coords.longitude ?? -93.265,
          },
          zoom: 10,
        }}
        properties={{
          isMyLocationEnabled: true,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 60,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 0,
  },
  tagline: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  map: {
    flex: 1,
  },
});
