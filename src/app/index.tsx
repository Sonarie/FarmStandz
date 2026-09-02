import * as Location from "expo-location";
import { GoogleMaps } from "expo-maps";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const selectedStandData = stands.find((stand) => stand.id === selectedStand);
  const categories = ["Produce", "Eggs", "Bakery", "Pantry", "Wood"];
  const produceItems = [
    "Corn",
    "Tomatoes",
    "Cucumbers",
    "Peppers",
    "Potatoes",
    "Onions",
    "Squash / Zucchini",
    "Pumpkins",
    "Apples",
    "Berries",
  ];
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduce, setSelectedProduce] = useState<string[]>([]);
  const [showOtherProduce, setShowOtherProduce] = useState(false);
  const [otherProduce, setOtherProduce] = useState("");
  const [customProduceItems, setCustomProduceItems] = useState<string[]>([]);

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
          <Pressable
            style={styles.closeButton}
            onPress={() => {
              setSelectedCategories([]);
              setSelectedProduce([]);
              setShowOtherProduce(false);
              setOtherProduce("");
              setShowDetails(false);
              setShowAddForm(false);
              setCustomProduceItems([]);
            }}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </Pressable>

          {!showDetails && (
            <>
              <Text style={styles.addFormTitle}>
                What kind of stand is this?
              </Text>

              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category);

                return (
                  <Pressable
                    key={category}
                    style={styles.categoryOption}
                    onPress={() => {
                      if (isSelected) {
                        setSelectedCategories(
                          selectedCategories.filter(
                            (item) => item !== category,
                          ),
                        );
                      } else {
                        setSelectedCategories([
                          ...selectedCategories,
                          category,
                        ]);
                      }
                    }}
                  >
                    <Text style={styles.checkbox}>
                      {isSelected ? "✓" : "○"}
                    </Text>
                    <Text style={styles.categoryText}>{category}</Text>
                  </Pressable>
                );
              })}

              <Pressable
                onPress={() => {
                  setShowDetails(true);
                }}
              >
                <Text style={styles.detailsText}>+ Add more details</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  console.log(
                    "ADD STAND",
                    newStandLocation,
                    selectedCategories,
                  );
                }}
              >
                <Text style={styles.addText}>Add</Text>
              </Pressable>
            </>
          )}

          {showDetails && selectedCategories.includes("Produce") && (
            <View>
              <Text style={styles.detailsTitle}>
                What produce is available?
              </Text>

              {produceItems.map((item) => {
                const isSelected = selectedProduce.includes(item);

                return (
                  <Pressable
                    key={item}
                    style={styles.categoryOption}
                    onPress={() => {
                      if (isSelected) {
                        setSelectedProduce(
                          selectedProduce.filter((produce) => produce !== item),
                        );
                      } else {
                        setSelectedProduce([...selectedProduce, item]);
                      }
                    }}
                  >
                    <Text style={styles.checkbox}>
                      {isSelected ? "✓" : "○"}
                    </Text>
                    <Text style={styles.categoryText}>{item}</Text>
                  </Pressable>
                );
              })}

              {!showOtherProduce ? (
                <Pressable
                  onPress={() => {
                    setShowOtherProduce(true);
                  }}
                >
                  {customProduceItems.map((item) => {
                    const isSelected = selectedProduce.includes(item);

                    return (
                      <Pressable
                        key={item}
                        style={styles.categoryOption}
                        onPress={() => {
                          if (isSelected) {
                            setSelectedProduce(
                              selectedProduce.filter(
                                (produce) => produce !== item,
                              ),
                            );
                          } else {
                            setSelectedProduce([...selectedProduce, item]);
                          }
                        }}
                      >
                        <Text style={styles.checkbox}>
                          {isSelected ? "✓" : "○"}
                        </Text>
                        <Text style={styles.categoryText}>{item}</Text>
                      </Pressable>
                    );
                  })}
                  <Text style={styles.otherItemText}>+ Add another item</Text>
                </Pressable>
              ) : (
                <TextInput
                  style={styles.otherItemInput}
                  placeholder="What else is available?"
                  value={otherProduce}
                  onChangeText={setOtherProduce}
                  onSubmitEditing={() => {
                    const newItem = otherProduce.trim();

                    if (newItem) {
                      setCustomProduceItems([...customProduceItems, newItem]);
                      setSelectedProduce([...selectedProduce, newItem]);
                    }

                    setOtherProduce("");
                    setShowOtherProduce(false);
                  }}
                  returnKeyType="done"
                />
              )}
            </View>
          )}
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
  categoryOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  checkbox: {
    fontSize: 20,
    width: 32,
  },
  categoryText: {
    fontSize: 17,
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 12,
    padding: 4,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  addText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  detailsText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  otherItemText: {
    marginTop: 12,
    fontSize: 16,
  },
  otherItemInput: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
});
