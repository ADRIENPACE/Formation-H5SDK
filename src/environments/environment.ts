// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { default as version } from '../../package.json';
export const environment = {
   appVersion: version,
   appName: "Formation H5 SDK - Development",
   production: false,
   logging: {
      level: 'ERROR', // Seulement les erreurs en production
      enableConsole: false
   }
};
