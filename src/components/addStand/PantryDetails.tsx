import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../../styles/mapStyles";

type PantryDetailsProps = {
  pantryItems: string[];
  selectedPantry: string[];
  setSelectedPantry: (items: string[]) => void;
  customPantryItems: string[];
  setCustomPantryItems: (items: string[]) => void;
  showOtherPantry: boolean;
  setShowOtherPantry: (show: boolean) => void;
  otherPantry: string;
  setOtherPantry: (value: string) => void;
};

export function PantryDetails({
  pantryItems,
  selectedPantry,
  setSelectedPantry,
  customPantryItems,
  setCustomPantryItems,
  showOtherPantry,
  setShowOtherPantry,
  otherPantry,
  setOtherPantry,
}: PantryDetailsProps) {
  return (
    <View>
      <Text style={styles.detailsTitle}>What pantry items are available?</Text>

      {pantryItems.map((item) => {
        const isSelected = selectedPantry.includes(item);

        return (
          <Pressable
            key={item}
            style={styles.categoryOption}
            onPress={() => {
              if (isSelected) {
                setSelectedPantry(
                  selectedPantry.filter((pantryItem) => pantryItem !== item),
                );
              } else {
                setSelectedPantry([...selectedPantry, item]);
              }
            }}
          >
            <Text style={styles.checkbox}>{isSelected ? "✓" : "○"}</Text>
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
                  selectedPantry.filter((pantryItem) => pantryItem !== item),
                );
              } else {
                setSelectedPantry([...selectedPantry, item]);
              }
            }}
          >
            <Text style={styles.checkbox}>{isSelected ? "✓" : "○"}</Text>
            <Text style={styles.categoryText}>{item}</Text>
          </Pressable>
        );
      })}

      {!showOtherPantry ? (
        <Pressable onPress={() => setShowOtherPantry(true)}>
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
    </View>
  );
}
