import { Pressable, Text, View } from "react-native";
import { styles } from "../../styles/mapStyles";

type CategorySelectionProps = {
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  onAddDetails: () => void;
  onSave: () => void;
};

export function CategorySelection({
  categories,
  selectedCategories,
  setSelectedCategories,
  onAddDetails,
  onSave,
}: CategorySelectionProps) {
  return (
    <>
      <Text style={styles.addFormTitle}>What kind of stand is this?</Text>

      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category);

        return (
          <Pressable
            key={category}
            style={styles.categoryOption}
            onPress={() => {
              if (isSelected) {
                setSelectedCategories(
                  selectedCategories.filter((item) => item !== category),
                );
              } else {
                setSelectedCategories([...selectedCategories, category]);
              }
            }}
          >
            <Text style={styles.checkbox}>{isSelected ? "✓" : "○"}</Text>
            <Text style={styles.categoryText}>{category}</Text>
          </Pressable>
        );
      })}

      {selectedCategories.length > 0 && (
        <View>
          <Pressable onPress={onAddDetails}>
            <Text style={styles.detailsText}>+ Add more details</Text>
          </Pressable>

          <Pressable onPress={onSave}>
            <Text style={styles.addText}>Save Stand</Text>
          </Pressable>
        </View>
      )}
    </>
  );
}
