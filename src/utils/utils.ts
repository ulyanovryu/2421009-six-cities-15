import {AuthorizationStatus} from '../const.ts';
const getAuthorizationStatus = () => AuthorizationStatus.Auth;
export default getAuthorizationStatus;
export const upperString = (stringToUpFirstLetter: string): string => stringToUpFirstLetter.charAt(0).toUpperCase() + stringToUpFirstLetter.slice(1);

