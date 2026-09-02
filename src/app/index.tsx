import * as Location from "expo-location";
import { GoogleMaps } from "expo-maps";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { stands } from "../data/stands";

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [selectedStand, setSelectedStand] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStandLocation, setNewStandLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const selectedStandData = stands.find((stand) => stand.id === selectedStand);
  useEffect(() => {
    async function checkLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        return;
      }

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
        markers={stands.map((stand) => ({
          id: stand.id,
          coordinates: {
            latitude:
              (location?.coords.latitude ?? 44.9778) +
              stand.coordinates.latitudeOffset,
            longitude:
              (location?.coords.longitude ?? -93.265) +
              stand.coordinates.longitudeOffset,
          },
          title: stand.name,
        }))}
        onMarkerClick={(marker) => {
          setSelectedStand(marker.id);
        }}
        onMapClick={() => {
          setSelectedStand(null);
        }}
        onMapLongClick={(event) => {
          console.log("LONG PRESS", event.coordinates);
          setNewStandLocation(event.coordinates);
          setSelectedStand(null);
          setShowAddForm(true);
        }}
        properties={{
          isMyLocationEnabled: true,
        }}
      />
      {selectedStandData && (
        <View style={styles.standCard}>
          <Text style={styles.standTitle}>{selectedStandData.name}</Text>
          <Text>{selectedStandData.category}</Text>
          <Text>{selectedStandData.description}</Text>
        </View>
      )}
      {showAddForm && (
        <View style={styles.addForm}>
          <Text style={styles.addFormTitle}>Add a Stand</Text>
          <Text>Name</Text>
          <Text>Category</Text>
          <Text>Description</Text>

          <Pressable
            onPress={() => {
              setShowAddForm(false);
            }}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
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
  addForm: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 150,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 6,
  },
  addFormTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  cancelText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
});
