export type Stand = {
  id: string;
  name: string;
  category: string;
  description: string;
  availableItems?: string[];
  coordinates: {
    latitudeOffset: number;
    longitudeOffset: number;
  };
};

export const stands: Stand[] = [
  {
    id: "sample-produce-stand",
    name: "Sample Produce Stand",
    category: "Produce",
    description: "Fresh roadside produce nearby",
    coordinates: {
      latitudeOffset: 0.002,
      longitudeOffset: 0.002,
    },
  },
  {
    id: "sample-egg-stand",
    name: "Sample Egg Stand",
    category: "Eggs",
    description: "Fresh local eggs",
    coordinates: {
      latitudeOffset: -0.002,
      longitudeOffset: -0.002,
    },
  },
];
