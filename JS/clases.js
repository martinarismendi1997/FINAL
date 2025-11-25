/*Gustavo Falco (estudiante 218814) y Martin Arismendi (estudiante 353787)*/

class Jugador { 
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
    this.difOK = 0;
    this.difMal = 0;
    this.sumaOK = 0;
    this.sumaMal = 0;
    this.comentarios = [];
  }

  toString() {
    return this.nombre + " ( " + this.edad + "años )";
  }
}

class Sistema {
  constructor() {
    this.jugadores = [];
    this.comentarios = [];
  }

  agregarJugador(jugador) {
    this.jugadores.push(jugador);
  }

  darTodos() {
    return this.jugadores;
  }

  darTodosComentarios(){
    return this.comentarios;
  }

  estaNombre(nombre) {
    let existe = false;
    let i = 0;
    while (i < this.jugadores.length) {
      if (this.jugadores[i].nombre === nombre) {
        existe = true;
      } 
      i ++;
    }
    return existe;
  }

  buscarJugador(nombre) {
    let encontrado = "null"; /*partimos que ese jugador no está*/
    for (let i = 0; i < this.jugadores.length; i++) {
      if (this.jugadores[i].nombre === nombre) {
        encontrado = this.jugadores[i];
      }
    }
    return encontrado;
  }

  agregarComentario(comentario) {
    this.comentarios.push(comentario);
  
    let jug = this.buscarJugador(comentario.nombre);
    if (jug !== null) { /*si existe ese jugador le agrgamos el comentario*/
      jug.comentarios.push(comentario);
    }
  }

}

class Comentario {
  constructor(nombreJugador, texto, hora){
    this.nombre = nombreJugador;
    this.texto = texto;
    this.hora = hora;
  }
  toString() {
    return this.nombre + ": " + this.texto + " (" + this.hora + ")";
  }
}

let sistema = new Sistema();

