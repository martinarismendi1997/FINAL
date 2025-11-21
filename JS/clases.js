class Jugador { 
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  toString() {
  return this.nombre + " " + this.edad ;
}
}

class Sistema {
  constructor() {
    this.jugadores = [];
  }

  agregarJugador(jugador) {
    this.jugadores.push(jugador);
  }

  darTodos() {
    return this.jugadores;
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
}

class Comentarios {
  constructor(){
    this.comentario = this.comentario;
  }
}

let sistema = new sistema();

