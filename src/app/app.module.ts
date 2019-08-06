import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, LoginDialogComponent } from './app.component';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './park/list/list.component';

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
    LoginDialogComponent,
    ListComponent,
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
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent],
})
export class AppModule { }
