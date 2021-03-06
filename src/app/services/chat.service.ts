import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMensaje } from '../interface/mensaje.interface';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;

  public chats: IMensaje[] = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState
      .subscribe(user => {
        console.log('Estado del usuario', user);

        if (!user) {
          return;
        }

        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;

      });
  }

  login(proveedor: string) {
    switch (proveedor) {
      case 'google':
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
        break;
      case 'github':
      this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider());
        break;
      default:
        break;
    }

  }
  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  CargarMensajes() {
    this.itemsCollection = this.afs.collection<IMensaje>('chats', ref => ref
      .orderBy('fecha', 'desc')
      .limit(5));
    // this.items = this.itemsCollection.valueChanges();

    return this.itemsCollection
      .valueChanges()
      .pipe(
        map((mensaje: IMensaje[]) => {
          console.log(mensaje);
          this.chats = mensaje.reverse();
        })
      );
  }

  AgregarMensaje(texto: string) {

    const mensaje: IMensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };
    return this.itemsCollection.add(mensaje);
  }

}
