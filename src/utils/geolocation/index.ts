import {PermissionsAndroid, PermissionsAndroidStatic} from 'react-native';

export const requestLocationPermission = async (): Promise<void> => {
  try {
    const permissions: PermissionsAndroidStatic = PermissionsAndroid;
    await permissions.request(permissions.PERMISSIONS.ACCESS_FINE_LOCATION, {
      title: 'Location Access Required',
      message: 'This app needs to access your location.',
      buttonPositive: 'OK',
    });
  } catch (err) {
    console.warn(err);
  }
};
