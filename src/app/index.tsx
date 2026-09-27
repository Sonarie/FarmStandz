import * as Location from "expo-location";
import { GoogleMaps } from "expo-maps";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { BakeryDetails } from "../components/addStand/BakeryDetails";
import { CategorySelection } from "../components/addStand/CategorySelection";
import { PantryDetails } from "../components/addStand/PantryDetails";
import { PhotoSection } from "../components/addStand/PhotoSection";
import { ProduceDetails } from "../components/addStand/ProduceDetails";
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

  // ====================
  // Reset Add Stand Form
  // ====================

  const resetAddStandForm = () => {
    // Reset shared stand information
    setStandPhotos([]);
    setSelectedCategories([]);
    setShowDetails(false);
    setShowAddForm(false);
    setNewStandLocation(null);

    // Reset Produce
    setSelectedProduce([]);
    setCustomProduceItems([]);
    setShowOtherProduce(false);
    setOtherProduce("");

    // Reset Bakery
    setSelectedBakery([]);
    setCustomBakeryItems([]);
    setShowOtherBakery(false);
    setOtherBakery("");

    // Reset Pantry
    setSelectedPantry([]);
    setCustomPantryItems([]);
    setShowOtherPantry(false);
    setOtherPantry("");
  };

  // ====================
  // Save Stand
  // ====================

  const saveStand = () => {
    if (!newStandLocation) return;

    const baseLatitude = location?.coords.latitude ?? 44.9778;
    const baseLongitude = location?.coords.longitude ?? -93.265;

    const inventory: string[] = [];

    if (selectedCategories.includes("Produce")) {
      inventory.push(...selectedProduce);
    }

    if (selectedCategories.includes("Bakery")) {
      inventory.push(...selectedBakery);
    }

    if (selectedCategories.includes("Pantry")) {
      inventory.push(...selectedPantry);
    }

    const newStand = {
      id: `stand-${Date.now()}`,
      name:
        selectedCategories.length === 1
          ? `${selectedCategories[0]} Stand`
          : "Roadside Stand",
      category: selectedCategories.join(", "),
      description: inventory.join(", "),
      photos: standPhotos,
      coordinates: {
        latitudeOffset: newStandLocation.latitude - baseLatitude,
        longitudeOffset: newStandLocation.longitude - baseLongitude,
      },
    };

    setMapStands((currentStands) => [...currentStands, newStand]);

    resetAddStandForm();
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
          <Text>{selectedStandData.description}</Text>

          {selectedStandData.photos?.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedStandData.photos.map((photo, index) => (
                <Image
                  key={`${photo}-${index}`}
                  source={{ uri: photo }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 8,
                    marginTop: 10,
                    marginRight: 10,
                  }}
                />
              ))}
            </ScrollView>
          )}
        </View>
      )}
      {showAddForm && (
        <ScrollView
          style={styles.addForm}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <Pressable style={styles.closeButton} onPress={resetAddStandForm}>
            <Text style={styles.closeButtonText}>×</Text>
          </Pressable>
          {!showDetails && (
            <CategorySelection
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              onAddDetails={() => setShowDetails(true)}
              onSave={saveStand}
            />
          )}
          {showDetails && selectedCategories.includes("Produce") && (
            <ProduceDetails
              produceItems={produceItems}
              selectedProduce={selectedProduce}
              setSelectedProduce={setSelectedProduce}
              customProduceItems={customProduceItems}
              setCustomProduceItems={setCustomProduceItems}
              showOtherProduce={showOtherProduce}
              setShowOtherProduce={setShowOtherProduce}
              otherProduce={otherProduce}
              setOtherProduce={setOtherProduce}
            />
          )}
          {showDetails && selectedCategories.includes("Bakery") && (
            <BakeryDetails
              bakeryItems={bakeryItems}
              selectedBakery={selectedBakery}
              setSelectedBakery={setSelectedBakery}
              customBakeryItems={customBakeryItems}
              setCustomBakeryItems={setCustomBakeryItems}
              showOtherBakery={showOtherBakery}
              setShowOtherBakery={setShowOtherBakery}
              otherBakery={otherBakery}
              setOtherBakery={setOtherBakery}
            />
          )}
          {showDetails && selectedCategories.includes("Pantry") && (
            <PantryDetails
              pantryItems={pantryItems}
              selectedPantry={selectedPantry}
              setSelectedPantry={setSelectedPantry}
              customPantryItems={customPantryItems}
              setCustomPantryItems={setCustomPantryItems}
              showOtherPantry={showOtherPantry}
              setShowOtherPantry={setShowOtherPantry}
              otherPantry={otherPantry}
              setOtherPantry={setOtherPantry}
            />
          )}
          {showDetails && (
            <PhotoSection
              standPhotos={standPhotos}
              setStandPhotos={setStandPhotos}
              onSave={saveStand}
            />
          )}
        </ScrollView>
      )}
    </View>
  );
}
