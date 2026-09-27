import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../../styles/mapStyles";

type BakeryDetailsProps = {
  bakeryItems: string[];
  selectedBakery: string[];
  setSelectedBakery: (items: string[]) => void;
  customBakeryItems: string[];
  setCustomBakeryItems: (items: string[]) => void;
  showOtherBakery: boolean;
  setShowOtherBakery: (show: boolean) => void;
  otherBakery: string;
  setOtherBakery: (value: string) => void;
};

export function BakeryDetails({
  bakeryItems,
  selectedBakery,
  setSelectedBakery,
  customBakeryItems,
  setCustomBakeryItems,
  showOtherBakery,
  setShowOtherBakery,
  otherBakery,
  setOtherBakery,
}: BakeryDetailsProps) {
  return (
    <View>
      <Text style={styles.detailsTitle}>What bakery items are available?</Text>

      {bakeryItems.map((item) => {
        const isSelected = selectedBakery.includes(item);

        return (
          <Pressable
            key={item}
            style={styles.categoryOption}
            onPress={() => {
              if (isSelected) {
                setSelectedBakery(
                  selectedBakery.filter((bakeryItem) => bakeryItem !== item),
                );
              } else {
                setSelectedBakery([...selectedBakery, item]);
              }
            }}
          >
            <Text style={styles.checkbox}>{isSelected ? "✓" : "○"}</Text>
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
                  selectedBakery.filter((bakeryItem) => bakeryItem !== item),
                );
              } else {
                setSelectedBakery([...selectedBakery, item]);
              }
            }}
          >
            <Text style={styles.checkbox}>{isSelected ? "✓" : "○"}</Text>
            <Text style={styles.categoryText}>{item}</Text>
          </Pressable>
        );
      })}

      {!showOtherBakery ? (
        <Pressable onPress={() => setShowOtherBakery(true)}>
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
    </View>
  );
}
