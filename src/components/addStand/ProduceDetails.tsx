import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../../styles/mapStyles";

type ProduceDetailsProps = {
  produceItems: string[];
  selectedProduce: string[];
  setSelectedProduce: (items: string[]) => void;
  customProduceItems: string[];
  setCustomProduceItems: (items: string[]) => void;
  showOtherProduce: boolean;
  setShowOtherProduce: (show: boolean) => void;
  otherProduce: string;
  setOtherProduce: (value: string) => void;
};

export function ProduceDetails({
  produceItems,
  selectedProduce,
  setSelectedProduce,
  customProduceItems,
  setCustomProduceItems,
  showOtherProduce,
  setShowOtherProduce,
  otherProduce,
  setOtherProduce,
}: ProduceDetailsProps) {
  return (
    <View>
      <Text style={styles.detailsTitle}>What produce is available?</Text>

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
            <Text style={styles.checkbox}>{isSelected ? "✓" : "○"}</Text>
            <Text style={styles.categoryText}>{item}</Text>
          </Pressable>
        );
      })}

      {!showOtherProduce ? (
        <Pressable onPress={() => setShowOtherProduce(true)}>
          {customProduceItems.map((item) => {
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
                <Text style={styles.checkbox}>{isSelected ? "✓" : "○"}</Text>
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
  );
}
