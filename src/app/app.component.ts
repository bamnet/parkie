import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public fireAuth: AngularFireAuth, private dialog: MatDialog) { }

  title = 'parkie';

  logout() {
    this.fireAuth.auth.signOut()
  }

  openLogin() {
    this.dialog.open(LoginDialog);
  }
}

@Component({
  selector: 'login-dialog',
  template: '<firebase-ui (signInSuccessWithAuthResult)="success()"></firebase-ui>'
})
export class LoginDialog {
  constructor(private dialogRef: MatDialogRef<LoginDialog>) { }

  success() {
    this.dialogRef.close();
  }
}