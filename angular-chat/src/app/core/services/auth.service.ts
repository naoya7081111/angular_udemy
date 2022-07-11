import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  create(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
}
