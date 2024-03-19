import {AuthorizationStatus} from '../const.ts';
const getAuthorizationStatus = () => AuthorizationStatus.Auth;
export default getAuthorizationStatus;
export const upperString = (stringToUpFirstLetter: string): string => stringToUpFirstLetter.charAt(0).toUpperCase() + stringToUpFirstLetter.slice(1);
export const plural = (number: number, txt: [string, string, string], cases = [2, 0, 1, 1, 1, 2]) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
