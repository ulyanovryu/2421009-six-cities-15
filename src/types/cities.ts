import {CITIES} from '../const.ts';

// export type City = {
//   name : string;
//   id : string;
//   location: {
//     latitude: number;
//     longitude: number;
//     zoom: number;
//   };
// };
//
// export type Cities = City[];

export type CityName = (typeof CITIES)[number]['name'];
export type City = (typeof CITIES)[number];
export type Cities = (typeof CITIES);
