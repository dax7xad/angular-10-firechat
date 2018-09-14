import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje: string;
  elemento: any;
  constructor(public _srvChats: ChatService) {
    this._srvChats.CargarMensajes()
      .subscribe( () => {
        setTimeout( () => this.elemento.scrollTop = this.elemento.scrollHeight, 50 );
      });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviar_mensaje = () => {
    // console.log(this.mensaje);
    if (this.mensaje.length === 0) {
      return;
    }
    this._srvChats.AgregarMensaje(this.mensaje)
      .then(response => this.mensaje = '')
      .catch(error => console.error('Error al enviar:', error)
      );

  }

}
