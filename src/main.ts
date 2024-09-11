import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


//   import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { appConfig } from './app/app.config';
// import { tokenInterceptor } from './app/Interceptor/token.interceptor';


// bootstrapApplication(AppComponent ,{
//   providers: [
//     provideHttpClient(
//       withInterceptors([tokenInterceptor]),
//     ),
  
//   ]
// }).catch(err => console.error(err));
