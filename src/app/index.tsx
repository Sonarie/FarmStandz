import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { GoogleMaps } from "expo-maps";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { stands } from "../data/stands";
import { styles } from "../styles/mapStyles";

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
  const [mapStands, setMapStands] = useState(stands);
  const selectedStandData = mapStands.find(
    (stand) => stand.id === selectedStand,
  );
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
  const bakeryItems = ["Bread", "Sourdough", "Cookies", "Cinnamon Rolls"];
  const pantryItems = [
    "Jams / Jellies",
    "Honey",
    "Maple Syrup",
    "Pickles",
    "Salsa",
  ];
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduce, setSelectedProduce] = useState<string[]>([]);
  const [selectedBakery, setSelectedBakery] = useState<string[]>([]);
  const [selectedPantry, setSelectedPantry] = useState<string[]>([]);
  const [showOtherProduce, setShowOtherProduce] = useState(false);
  const [otherProduce, setOtherProduce] = useState("");
  const [customProduceItems, setCustomProduceItems] = useState<string[]>([]);
  const [showOtherBakery, setShowOtherBakery] = useState(false);
  const [otherBakery, setOtherBakery] = useState("");
  const [customBakeryItems, setCustomBakeryItems] = useState<string[]>([]);
  const [showOtherPantry, setShowOtherPantry] = useState(false);
  const [otherPantry, setOtherPantry] = useState("");
  const [customPantryItems, setCustomPantryItems] = useState<string[]>([]);
  const [standPhotos, setStandPhotos] = useState<string[]>([]);

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

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Camera permission needed",
        "Roadside Standz needs camera access to take a photo.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });

    if (!result.canceled) {
      setStandPhotos((currentPhotos) => [
        ...currentPhotos,
        result.assets[0].uri,
      ]);
    }
  };
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
        markers={mapStands.map((stand) => ({
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
          if (marker.id) {
            setSelectedStand(marker.id);
          }
        }}
        onMapClick={() => {
          setSelectedStand(null);
        }}
        onMapLongClick={(event) => {
          const { latitude, longitude } = event.coordinates;

          if (latitude !== undefined && longitude !== undefined) {
            console.log("LONG PRESS", event.coordinates);

            setNewStandLocation({
              latitude,
              longitude,
            });

            setSelectedStand(null);
            setShowAddForm(true);
          }
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
        <ScrollView
          style={styles.addForm}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <Pressable
            style={styles.closeButton}
            onPress={() => {
              setSelectedCategories([]);
              setSelectedProduce([]);
              setShowOtherProduce(false);
              setOtherProduce("");
              setCustomProduceItems([]);
              setShowDetails(false);
              setShowAddForm(false);
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

              {selectedCategories.length > 0 && (
                <>
                  <Pressable
                    onPress={() => {
                      setShowDetails(true);
                    }}
                  >
                    <Text style={styles.detailsText}>+ Add more details</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      if (!newStandLocation) return;

                      const baseLatitude = location?.coords.latitude ?? 44.9778;
                      const baseLongitude =
                        location?.coords.longitude ?? -93.265;

                      const newStand = {
                        id: `stand-${Date.now()}`,
                        name: "Produce Stand",
                        category: selectedCategories.join(", "),
                        description:
                          selectedProduce.length > 0
                            ? selectedProduce.join(", ")
                            : "No items listed yet",
                        coordinates: {
                          latitudeOffset:
                            newStandLocation.latitude - baseLatitude,
                          longitudeOffset:
                            newStandLocation.longitude - baseLongitude,
                        },
                      };

                      setMapStands((currentStands) => [
                        ...currentStands,
                        newStand,
                      ]);
                      setStandPhotos([]);
                      setSelectedCategories([]);
                      setSelectedProduce([]);
                      setCustomProduceItems([]);
                      setShowOtherProduce(false);
                      setOtherProduce("");
                      setShowDetails(false);
                      setShowAddForm(false);
                      setNewStandLocation(null);
                    }}
                  >
                    <Text style={styles.addText}>Save Stand</Text>
                  </Pressable>
                </>
              )}
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
              <Pressable
                onPress={() => {
                  if (!newStandLocation) return;

                  const baseLatitude = location?.coords.latitude ?? 44.9778;
                  const baseLongitude = location?.coords.longitude ?? -93.265;

                  const newStand = {
                    id: `stand-${Date.now()}`,
                    name: "Produce Stand",
                    category: selectedCategories.join(", "),
                    description:
                      selectedProduce.length > 0
                        ? selectedProduce.join(", ")
                        : "No items listed yet",
                    coordinates: {
                      latitudeOffset: newStandLocation.latitude - baseLatitude,
                      longitudeOffset:
                        newStandLocation.longitude - baseLongitude,
                    },
                  };

                  setMapStands((currentStands) => [...currentStands, newStand]);
                  setStandPhotos([]);
                  setSelectedCategories([]);
                  setSelectedProduce([]);
                  setCustomProduceItems([]);
                  setShowOtherProduce(false);
                  setOtherProduce("");
                  setShowDetails(false);
                  setShowAddForm(false);
                  setNewStandLocation(null);
                }}
              >
                <Text style={styles.addText}>Save Stand</Text>
              </Pressable>
            </View>
          )}
          {showDetails && selectedCategories.includes("Bakery") && (
            <View>
              <Text style={styles.detailsTitle}>
                What bakery items are available?
              </Text>

              {bakeryItems.map((item) => {
                const isSelected = selectedBakery.includes(item);

                return (
                  <Pressable
                    key={item}
                    style={styles.categoryOption}
                    onPress={() => {
                      if (isSelected) {
                        setSelectedBakery(
                          selectedBakery.filter(
                            (bakeryItem) => bakeryItem !== item,
                          ),
                        );
                      } else {
                        setSelectedBakery([...selectedBakery, item]);
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

              {customBakeryItems.map((item) => {
                const isSelected = selectedBakery.includes(item);

                return (
                  <Pressable
                    key={item}
                    style={styles.categoryOption}
                    onPress={() => {
                      if (isSelected) {
                        setSelectedBakery(
                          selectedBakery.filter(
                            (bakeryItem) => bakeryItem !== item,
                          ),
                        );
                      } else {
                        setSelectedBakery([...selectedBakery, item]);
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

              {!showOtherBakery ? (
                <Pressable
                  onPress={() => {
                    setShowOtherBakery(true);
                  }}
                >
                  <Text style={styles.otherItemText}>+ Add another item</Text>
                </Pressable>
              ) : (
                <TextInput
                  style={styles.otherItemInput}
                  placeholder="What else is available?"
                  value={otherBakery}
                  onChangeText={setOtherBakery}
                  onSubmitEditing={() => {
                    const newItem = otherBakery.trim();

                    if (newItem) {
                      setCustomBakeryItems([...customBakeryItems, newItem]);
                      setSelectedBakery([...selectedBakery, newItem]);
                    }

                    setOtherBakery("");
                    setShowOtherBakery(false);
                  }}
                  returnKeyType="done"
                />
              )}
              <Pressable
                onPress={() => {
                  if (!newStandLocation) return;

                  const baseLatitude = location?.coords.latitude ?? 44.9778;
                  const baseLongitude = location?.coords.longitude ?? -93.265;

                  const newStand = {
                    id: `stand-${Date.now()}`,
                    name: "Bakery Stand",
                    category: selectedCategories.join(", "),
                    description:
                      selectedBakery.length > 0
                        ? selectedBakery.join(", ")
                        : "No items listed yet",
                    coordinates: {
                      latitudeOffset: newStandLocation.latitude - baseLatitude,
                      longitudeOffset:
                        newStandLocation.longitude - baseLongitude,
                    },
                  };

                  setMapStands((currentStands) => [...currentStands, newStand]);

                  setSelectedCategories([]);
                  setSelectedBakery([]);
                  setCustomBakeryItems([]);
                  setShowOtherBakery(false);
                  setOtherBakery("");
                  setShowDetails(false);
                  setShowAddForm(false);
                  setNewStandLocation(null);
                }}
              >
                <Text style={styles.addText}>Save Stand</Text>
              </Pressable>
            </View>
          )}
          {showDetails && selectedCategories.includes("Pantry") && (
            <View>
              <Text style={styles.detailsTitle}>
                What pantry items are available?
              </Text>

              {pantryItems.map((item) => {
                const isSelected = selectedPantry.includes(item);

                return (
                  <Pressable
                    key={item}
                    style={styles.categoryOption}
                    onPress={() => {
                      if (isSelected) {
                        setSelectedPantry(
                          selectedPantry.filter(
                            (pantryItem) => pantryItem !== item,
                          ),
                        );
                      } else {
                        setSelectedPantry([...selectedPantry, item]);
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

              {customPantryItems.map((item) => {
                const isSelected = selectedPantry.includes(item);

                return (
                  <Pressable
                    key={item}
                    style={styles.categoryOption}
                    onPress={() => {
                      if (isSelected) {
                        setSelectedPantry(
                          selectedPantry.filter(
                            (pantryItem) => pantryItem !== item,
                          ),
                        );
                      } else {
                        setSelectedPantry([...selectedPantry, item]);
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

              {!showOtherPantry ? (
                <Pressable
                  onPress={() => {
                    setShowOtherPantry(true);
                  }}
                >
                  <Text style={styles.otherItemText}>+ Add another item</Text>
                </Pressable>
              ) : (
                <TextInput
                  style={styles.otherItemInput}
                  placeholder="What else is available?"
                  value={otherPantry}
                  onChangeText={setOtherPantry}
                  onSubmitEditing={() => {
                    const newItem = otherPantry.trim();

                    if (newItem) {
                      setCustomPantryItems([...customPantryItems, newItem]);
                      setSelectedPantry([...selectedPantry, newItem]);
                    }

                    setOtherPantry("");
                    setShowOtherPantry(false);
                  }}
                  returnKeyType="done"
                />
              )}

              <Pressable
                onPress={() => {
                  if (!newStandLocation) return;

                  const baseLatitude = location?.coords.latitude ?? 44.9778;
                  const baseLongitude = location?.coords.longitude ?? -93.265;

                  const newStand = {
                    id: `stand-${Date.now()}`,
                    name: "Pantry Stand",
                    category: selectedCategories.join(", "),
                    description:
                      selectedPantry.length > 0
                        ? selectedPantry.join(", ")
                        : "No items listed yet",
                    coordinates: {
                      latitudeOffset: newStandLocation.latitude - baseLatitude,
                      longitudeOffset:
                        newStandLocation.longitude - baseLongitude,
                    },
                  };

                  setMapStands((currentStands) => [...currentStands, newStand]);

                  setSelectedCategories([]);
                  setSelectedPantry([]);
                  setCustomPantryItems([]);
                  setShowOtherPantry(false);
                  setOtherPantry("");
                  setShowDetails(false);
                  setShowAddForm(false);
                  setNewStandLocation(null);
                }}
              >
                <Text style={styles.addText}>Save Stand</Text>
              </Pressable>
            </View>
          )}
          {showDetails && (
            <View>
              <Pressable
                onPress={() => {
                  Alert.alert(
                    "Add photos",
                    "How would you like to add a photo?",
                    [
                      {
                        text: "Take Photo",
                        onPress: takePhoto,
                      },
                      {
                        text: "Choose from Library",
                        onPress: async () => {
                          const result =
                            await ImagePicker.launchImageLibraryAsync({
                              quality: 0.8,
                            });

                          if (!result.canceled) {
                            setStandPhotos((currentPhotos) => [
                              ...currentPhotos,
                              result.assets[0].uri,
                            ]);
                          }
                        },
                      },
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                    ],
                  );
                }}
              >
                <Text style={styles.detailsText}>+ Add photos</Text>
              </Pressable>
              {standPhotos.map((photo, index) => (
                <Image
                  key={`${photo}-${index}`}
                  source={{ uri: photo }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 8,
                    marginTop: 10,
                  }}
                />
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
