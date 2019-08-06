import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, LoginDialog } from './app.component';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const firebaseUIAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

@NgModule({
  declarations: [
    AppComponent,
    LoginDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUIAuthConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialog],
})
export class AppModule { }
