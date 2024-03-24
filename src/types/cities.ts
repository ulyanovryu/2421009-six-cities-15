import {CITIES} from '../const.ts';

export type CityName = (typeof CITIES)[number]['name'];
export type City = (typeof CITIES)[number];
export type Cities = (typeof CITIES);
