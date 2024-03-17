export type City = {
  name : string;
  link : string;
  id : number;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

export type Cities = City[];
