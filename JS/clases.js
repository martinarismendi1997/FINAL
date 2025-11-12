class Jugador { 
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
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
