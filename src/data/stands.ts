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

export const stands: Stand[] = [];
