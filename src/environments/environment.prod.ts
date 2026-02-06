import { default as version } from '../../package.json';
export const environment = {
   appVersion: version,
   appName: "Formation H5 SDK",
   production: true,
   logging: {
      level: 'ERROR', // Seulement les erreurs en production
      enableConsole: false
   }
};
