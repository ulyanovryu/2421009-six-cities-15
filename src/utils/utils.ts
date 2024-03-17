import {AuthorizationStatus} from '../const.ts';
const getAuthorizationStatus = () => AuthorizationStatus.NoAuth;
export default getAuthorizationStatus;
export const upperString = (stringToUpFirstLetter: string): string => stringToUpFirstLetter.charAt(0).toUpperCase() + stringToUpFirstLetter.slice(1);

