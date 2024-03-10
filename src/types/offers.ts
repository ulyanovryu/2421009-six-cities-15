export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
  description?: string;
  bedrooms?: number;
  goods?: string[];
  host?: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images?: string[];
  maxAdults?: number;
};

// "description": "A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.",
// "bedrooms": 3,
// "goods": [
// "Heating"
// ],

export type Offers = Offer[];


export type OffersListTemplate = 'mainScreen' | 'favoriteScreen' | 'offerScreen';
