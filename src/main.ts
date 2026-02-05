import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { Log } from '@infor-up/m3-odin';
import { M3OdinModule } from '@infor-up/m3-odin-angular';
import { SohoToastService, SohoModalDialogService, SohoMessageService, SohoAboutService } from 'ids-enterprise-ng';

// Déclaration de type pour Soho global
declare const Soho: any;

// Initialisation de la locale IDS
function initializeIdsLocale(locale: string) {
   return () => {
      Soho.Locale.culturesPath = 'assets/ids-enterprise/js/cultures/';
      return Soho.Locale.set(locale).catch((err: any) => {
         Log.error('Failed to set IDS locale', err);
      });
   };
}

// Initialisation de la langue de traduction
function initializeTranslate(translateService: TranslateService) {
   return () => {
      translateService.setDefaultLang('fr-FR');
      return translateService.use('fr-FR').toPromise();
   };
}

bootstrapApplication(AppComponent, {
   providers: [
      provideHttpClient(),
      provideAnimations(),
      provideRouter([]),
      {
         provide: LOCALE_ID,
         useValue: 'fr-FR',
      },
      {
         provide: APP_INITIALIZER,
         multi: true,
         useFactory: initializeIdsLocale,
         deps: [LOCALE_ID],
      },
      // Configuration de TranslateService pour standalone
      provideTranslateService({
         loader: provideTranslateHttpLoader({
            prefix: './assets/i18n/',
            suffix: '.json',
         }),
         defaultLanguage: 'fr-FR',
      }),
      {
         provide: APP_INITIALIZER,
         multi: true,
         useFactory: initializeTranslate,
         deps: [TranslateService],
      },
      // Module M3 Odin (fournit UserService, MIService, IonApiService, FormService, etc.)
      importProvidersFrom(M3OdinModule),
      // Services Soho/IDS Enterprise
      SohoToastService,
      SohoModalDialogService,
      SohoMessageService,
      SohoAboutService
   ]
}).catch(err => console.error(err));
