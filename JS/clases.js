class Jugador { 
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
}

prueba 12-11
class Sistema {
  constructor() {
    this.jugadores = [];
  }

  agregarJugador(jugador) {
    this.jugadores.push(jugador);
  }
}
