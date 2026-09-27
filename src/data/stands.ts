export type Stand = {
  id: string;
  name: string;
  category: string;
  description: string;
  photos: string[];
  availableItems?: string[];
  coordinates: {
    latitudeOffset: number;
    longitudeOffset: number;
  };
};

export const stands: Stand[] = [];
