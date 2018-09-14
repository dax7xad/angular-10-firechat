import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMensaje } from '../interface/mensaje.interface';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;

  public chats: IMensaje[] = [];

  constructor(private afs: AngularFirestore) {}

  CargarMensajes() {
     this.itemsCollection = this.afs.collection<IMensaje>('chats', ref => ref
     .orderBy('fecha', 'desc')
     .limit(5));
    // this.items = this.itemsCollection.valueChanges();

    return this.itemsCollection
    .valueChanges()
    .pipe(
      map( (mensaje: IMensaje[]) => {
      console.log(mensaje);
      this.chats = mensaje.reverse();
    })
  );
  }

  AgregarMensaje (texto: string) {

    const mensaje: IMensaje = {
      nombre: 'demo',
      mensaje: texto,
      fecha: new Date().getTime()
    };
    return this.itemsCollection.add(mensaje);
  }

}
