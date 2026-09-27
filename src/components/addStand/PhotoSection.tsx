import * as ImagePicker from "expo-image-picker";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { styles } from "../../styles/mapStyles";

type PhotoSectionProps = {
  standPhotos: string[];
  setStandPhotos: (photos: string[]) => void;
  onSave: () => void;
};

export function PhotoSection({
  standPhotos,
  setStandPhotos,
  onSave,
}: PhotoSectionProps) {
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
      setStandPhotos([...standPhotos, result.assets[0].uri]);
    }
  };

  const choosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.8,
    });

    if (!result.canceled) {
      setStandPhotos([...standPhotos, result.assets[0].uri]);
    }
  };

  const showPhotoOptions = () => {
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
          onPress: choosePhoto,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
    );
  };

  return (
    <View>
      <Pressable onPress={showPhotoOptions}>
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

      <Pressable onPress={onSave}>
        <Text style={styles.addText}>Save Stand</Text>
      </Pressable>
    </View>
  );
}