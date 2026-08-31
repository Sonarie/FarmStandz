import * as Location from "expo-location";
import { GoogleMaps } from "expo-maps";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [selectedStand, setSelectedStand] = useState<string | null>(null);
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
        markers={[
          {
            id: "sample-produce-stand",
            coordinates: {
              latitude: (location?.coords.latitude ?? 44.9778) + 0.002,
              longitude: (location?.coords.longitude ?? -93.265) + 0.002,
            },
            title: "Sample Produce Stand",
          },
        ]}
        onMarkerClick={(marker) => {
          setSelectedStand(marker.id);
        }}
        onMapClick={() => {
          setSelectedStand(null);
        }}
        properties={{
          isMyLocationEnabled: true,
        }}
      />
      {selectedStand && (
        <View style={styles.standCard}>
          <Text style={styles.standTitle}>Sample Produce Stand</Text>
          <Text>Produce</Text>
          <Text>Fresh roadside produce nearby</Text>
        </View>
      )}
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
  standCard: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 90,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 5,
  },
  standTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
});
