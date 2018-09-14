// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBD1uSYsJjgRI0F8B9h1bgOTWsA-LChLW4',
    authDomain: 'firechat-f95e9.firebaseapp.com',
    databaseURL: 'https://firechat-f95e9.firebaseio.com',
    projectId: 'firechat-f95e9',
    storageBucket: 'firechat-f95e9.appspot.com',
    messagingSenderId: '709000658255'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
