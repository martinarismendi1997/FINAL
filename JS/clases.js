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
}
