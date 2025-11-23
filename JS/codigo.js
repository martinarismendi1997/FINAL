    window.addEventListener("load", inicio);

    function inicio ()
    {
        instertTot()
        juegoSuma ()

        document.getElementById("botonDatos").addEventListener("click", function() {
        mostrarSeccion("datos");
        });
        document.getElementById("botonJuegos").addEventListener("click", function() {
        mostrarSeccion("juegos");
        });
        document.getElementById("botonAdministrador").addEventListener("click", function() {
        mostrarSeccion("admin");
        });
        mostrarSeccion("datos");

        document.getElementById("AgregarAlta").addEventListener("click",altaJugador)

        document.getElementById("juegoDif").addEventListener("click", EligioJugador)

        document.getElementById("idEnviarCalculaSuma").addEventListener("click",EligioJugadorSuma)

        document.getElementById("idEnviarComentario").addEventListener("click",comentario) 

        document.getElementById("idActualizarComentarios").addEventListener("click", actualizarComentario)        
    };
    
    function mostrarSeccion(seccion) {/*comenzamos el juego bloqueando las secciones juegos y admin*/

        if ((seccion === "juegos" || seccion === "admin") && sistema.jugadores.length === 0) {
            alert("Debe ingresar al menos un jugador para jugar.");
            return; /*este if es el que detecta el error al querer jugar sin jugador*/
        }
        /*esto lo vimos con ChatGPT*/
        document.querySelector(".datos").style.display = "none"; /*bloqueamos todas las secciones*/ 
        document.querySelector(".juegos").style.display = "none";
        document.querySelector(".admin").style.display = "none";
        document.querySelector("." + seccion).style.display = "block"; /*con esta linea mostramos solo la seleccionada*/
    }    

    function altaJugador (){
        if (document.getElementById("formAltaJugadores").reportValidity()){ /*validamos la edad */
            let nombre = document.getElementById("Nombre").value.trim(); /*la funcion trim() saca espacios en blanco*/
            let edad = document.getElementById("Edad").value;

            if (sistema.estaNombre(nombre)) { /*validamos el nombre del jugador*/
                alert("¡Nombre repetido!, ingrese otro por favor");
                return;
            }
            let jug = new Jugador (nombre, edad); /*creamos un nuevo jugador */
            sistema.agregarJugador(jug); /*lo agregamos a nuestro sistema*/

            let tabla = document.querySelector("#idtabla tbody");
            let fila = tabla.insertRow();
            fila.insertCell().textContent = nombre; /*estuve leyendo que innerHTML no es seguro y se puede modificar el codigo desde el exterior*/
            fila.insertCell().textContent = edad; /*al usar textContent se soluciona esa "falla"*/
            fila.insertCell().textContent = ""; /*creamos el campo coemntarios para agregarlo despues*/
        
            document.getElementById("Jugador").append(new Option(nombre, nombre)); /*creamos Option y Select*/
        }

        /*para resetear los campos de Alta Jugador, no me quedo con el reset*/
        document.getElementById("Nombre").value = ""; 
        document.getElementById("Edad").value = 5;
    }

    /** -------------------------------------------- COMIENZA JUEGO DE DIFERENCIA--------------------------------------------------------------**/


    let azarColsDif;
    let azarFilasDif;

    function instertTot (){ 
        let tabla = document.getElementById("juegoDif");
        tabla.innerHTML = ""

        let azarPareja = Math.trunc(Math.random()*parejas.length); 
        let azarFilas = Math.trunc(Math.random()*3+2);
        let azarCols = Math.trunc(Math.random()*3+2);
        let repetido = Math.trunc(Math.random()*2);

        azarColsDif = Math.trunc(Math.random()*azarCols-1);
        azarFilasDif = Math.trunc(Math.random()*azarFilas-1);
        
        AgregaATabla ( azarPareja,repetido, azarFilas, azarCols);

        instertDif (azarFilasDif , azarColsDif, azarPareja, repetido );
    }

    function instertDif (filas, columnas, numeroPareja, emojin){
        let otro = 1
        if (emojin == 1) {otro = 0}

        let tabla = document.getElementById ("juegoDif")
        tabla.rows[filas].cells[columnas].innerHTML = parejas [numeroPareja][otro];
    }


    function AgregaATabla (conjunto, par, cantFil, CantCol){
        let tabla = document.getElementById ("juegoDif")
        for (let i=0 ; i<CantCol ; i++){
            let fila = tabla.insertRow ();                

            for (let j=0 ; j<cantFil ; j++){
                let cont = fila.insertCell ();
                cont.innerHTML = parejas [conjunto][par]
            }
        } return tabla
    }
    
    
    function EligioJugador (evento) {
        let eligio = document.getElementById ("Jugador").value
        if (!eligio) {alert("Debe seleccionar un jugador")} else {clickear (evento)}
    }
    
    
    function clickear (evento){ 
        let ResJuego1 = false 
        let celda = evento.target.closest("td"); /*NOS AYUDO CHAT CON ESTA PARTE DEL CODIGO*/
        if (!celda) return;

        let fila = celda.parentNode.rowIndex ;
        let columna = celda.cellIndex ;        

        if ((azarFilasDif == fila) && (azarColsDif == columna)){
                ResJuego1 = true
                setTimeout(instertTot, 1000);
            }              

        if (ResJuego1 && tieneSonido()) {hacerSonido1()}

        if (!ResJuego1 && tieneSonido()) {hacerSonido2()}

        if (!tieneSonido() && ResJuego1) {alert("Correcto")}
        
        if (!tieneSonido() && !ResJuego1) {alert("Incorrecto")}

        let jugador = sistema.buscarJugador(document.getElementById("Jugador").value); /*traemos al jugador*/
        if (ResJuego1 === true) {
            jugador.difOK++; /*le cargamos los aciertos*/
        } 
        else {
            jugador.difMal++; /*le cargamos los errados*/
        }
        actualizarTablaResumen();
    };

function tieneSonido (){
    let check = document.getElementById("Sonido");
    let activado = check.checked
    return activado
}
    
function hacerSonido1() {
    let sonido = new Audio("SONIDOS/ping.mp3");
    sonido.play();
}

function hacerSonido2() {
    let sonido = new Audio("SONIDOS/ping2.mp3");
    sonido.play();
}

let parejas = [
    ["🐶", "🐺"],
    ["🐱", "🦁"],
    ["🐰", "🐹"],
    ["🐸", "🐢"],
    ["🐴", "🦄"],
    ["🐮", "🐷"],
    ["🍎", "🍅"],
    ["👮", "🕵️"],
    ["🐻", "🐼"],
    ["🐭", "🐹"],
    ["🐔", "🐤"],
    ["🐍", "🦎"],
    ["🐟", "🐠"],
    ["🦉", "🦅"],
    ["🍒", "🍇"],
    ["🍉", "🍈"],
    ["😀", "😃"],
    ["😎", "🤠"],
    ["😐", "😶"],
]

function comentario (){
    let comentario = document.getElementById("Comentarios").value
}


/** -------------------------------------------- TERMINA JUEGO DE DIFERENCIA--------------------------------------------------------------**/

/** -------------------------------------------- COMIENZA JUEGO DE LA SUMA--------------------------------------------------------------**/

let num1 = 0
let num2 = 0

function juegoSuma (){
    num1 = Math.trunc(Math.random()*10+1);
    num2 = Math.trunc(Math.random()*10+1);

    let parrafo = document.getElementById("JuegoSuma")
    parrafo.innerHTML = ("Sume " + num1 + " + " + num2)
}

function EligioJugadorSuma (){
        let eligio = document.getElementById ("Jugador").value
        if (!eligio) {alert("Debe seleccionar un jugador")} else {ResultadoSuma ()}

    }
function ResultadoSuma (){
    let resultado = false   
    let valor = document.getElementById("ResultSuma").value
    let valor1 = document.getElementById("ResultSuma")
    if (valor == (num1+num2)) {
        resultado = true; 
        valor1.value = "";
    }

    /*Registramos los aciertos y errores igual que en el juego anterior*/
    let jugador = sistema.buscarJugador(document.getElementById("Jugador").value);
    if (resultado === true) {
    jugador.sumaOK++;
    } 
    else {
        jugador.sumaMal++;
    }
    actualizarTablaResumen(); /*actualizamos los datos en la tabla*/

    if (resultado && tieneSonido()){
        hacerSonido1(); 
        setTimeout(juegoSuma,1000);
        valor1.style.backgroundColor = "lightgreen";
    }

    if (!resultado && tieneSonido()){ 
        hacerSonido2();
        valor1.style.backgroundColor = "yellow";
    }

    if (resultado && !tieneSonido()){
        setTimeout(juegoSuma,1000); 
        valor1.style.backgroundColor = "lightgreen";
    }

    if (!resultado && !tieneSonido()){
        valor1.style.backgroundColor = "yellow";
    }
    
}

/* ----------------------------------COMENTARIOS-------------------------------------- */

function comentario() {
    let nombreJugador = document.getElementById("Jugador").value;
    if (nombreJugador === "A completar" || nombreJugador === "") {
        alert("Debe seleccionar un jugador para comentar.");
        return; /* Aca verificamos que seleccionamos un jugador*/
    }

    let textoComentario = document.getElementById("Comentarios").value.trim();
    if (textoComentario === "") {
        alert("Debe escribir un comentario.");
        return;
    }
    let ahora = new Date(); /*es una funcion ya existente en J.S */
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();
    let horaComentario = horas + ":" + minutos + ":" + segundos;

    let com = new Comentario (nombreJugador, textoComentario, horaComentario);
    sistema.agregarComentario(com); /*agregamos el comentario al jugador*/

    actualizarTablaDatos(); /*actualizamos la tabla*/
    actualizarComentario();
    actualizarTablaResumen();
    document.getElementById("Comentarios").value = ""; /*vaciamos el contenido de comentarios*/

}

function actualizarTablaDatos() {

    let tabla = document.querySelector("#idtabla tbody");
    tabla.innerHTML = ""; /*accedemos a la tabla y la reseteamos*/

    for (let i = 0; i < sistema.jugadores.length; i++) {
        let jug = sistema.jugadores[i];        
        let fila = tabla.insertRow();
        fila.insertCell().textContent = jug.nombre; /*no usamos innerHTML*/
        fila.insertCell().textContent = jug.edad;
        let textoComentarios = "";

        for (let j = 0; j < jug.comentarios.length; j++) {
            let aux = jug.comentarios[j];
            textoComentarios += "- " + aux.texto + " (" + aux.hora + ")\n";
        }
        
        fila.insertCell().textContent = textoComentarios;
    }
}

function actualizarComentario() {

    let tabla = document.querySelector("#idTablaAdmComentario tbody");
    tabla.innerHTML = "" /*reseteamos la tabla para comenzar*/

    let lista = sistema.comentarios.slice(); /*hacemos una copia de la lista para no modificar la original, lo vimos en clase*/

    lista.sort(function(a, b) {
    if (a.hora < b.hora) { 
        return -1; 
    }
    if (a.hora > b.hora) { 
        return 1; 
    }
    return 0; /*si son iguales retorna 0*/
    });

    for (let i = 0; i < lista.length; i++) {
        let com = lista[i]; /* recorre los comentarios  */
        let fila = tabla.insertRow(); /* crear fila nueva*/

        /*Cargamos en las celdas: nombre, hora y comentario*/
        fila.insertCell().textContent = com.nombre; /*no usamos innerHTML*/
        fila.insertCell().textContent = com.hora;
        fila.insertCell().textContent = com.texto;
    }
}

function actualizarTablaResumen() {
    
    let tabla = document.querySelector("#idTablaResumen tbody");    
    tabla.innerHTML = ""; /*vaciamos la tabla*/

    let lista = sistema.jugadores.slice();

    lista.sort(function(a, b) { /*usamos la misma funcion para ordenar*/
        if (a.nombre < b.nombre) { return -1; }
        if (a.nombre > b.nombre) { return 1; }
        return 0;
    });
    
    for (let i = 0; i < lista.length; i++) { /*recorremos la lista*/
        let jug = lista[i];
        let fila = tabla.insertRow();

        /*agregamos los datos a la lista en cada i*/
        fila.insertCell().textContent = jug.nombre; /*no usamos innerHTML*/
        fila.insertCell().textContent = jug.edad;
        fila.insertCell().textContent = jug.difOK;
        fila.insertCell().textContent = jug.difMal;
        fila.insertCell().textContent = jug.sumaOK;
        fila.insertCell().textContent = jug.sumaMal;
        fila.insertCell().textContent = jug.comentarios.length; /*la cantidad de comentarios que tiene*/
    }
}

