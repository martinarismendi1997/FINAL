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
            let nombre = document.getElementById("Nombre").value;
            let edad = document.getElementById("Edad").value;

            if (sistema.estaNombre(nombre)) { /*validamos el nombre del jugador*/
                alert("¡Nombre repetido!, ingrese otro por favor");
            }
            let jug = new Jugador (nombre, edad); /*creamos un nuevo jugador */
            sistema.agregarJugador(jug); /*lo agregamos a nuestro sistema*/

            let tabla = document.querySelector("#idtabla tbody");
            let fila = tabla.insertRow();
            fila.insertCell().textContent = nombre; /*estuve leyendo que innerHTML no es seguro y se puede modificar el codigo desde el exterior*/
            fila.insertCell().textContent = edad; /*al usar textContent se soluciona es "falla"*/
            fila.insertCell().textContent = ""; /*creamos el campo coemntarios para agregarlo despues*/
        
            let sel = document.getElementById("Jugador"); /*sel es el select donde va jugador*/
            let op = document.createElement("option");
            op.value = nombre;
            op.textContent = nombre;
            sel.appendChild(op);        
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
        let celda = evento.target.closest("td");
        if (!celda) return;

        let fila = celda.parentNode.rowIndex ;
        let columna = celda.cellIndex ;        

        if ((azarFilasDif == fila) && (azarColsDif == columna)){
                ResJuego1 = true
                setTimeout(instertTot, 1000);}

        if (ResJuego1 && tieneSonido()) {hacerSonido1()}

        if (!ResJuego1 && tieneSonido()) {hacerSonido2()}

        if (!tieneSonido() && ResJuego1) {alert("Correcto")}
        
        if (!tieneSonido() && !ResJuego1) {alert("Incorrecto")}
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
    if (valor == (num1+num2)) {resultado = true; valor1.value = ""}

    if (resultado && tieneSonido()){
        hacerSonido1(); setTimeout(juegoSuma,1000);valor1.style.backgroundColor = "lightgreen"
    }

    if (!resultado && tieneSonido()){ 
        hacerSonido2();valor1.style.backgroundColor = "yellow"
    }

    if (resultado && !tieneSonido()){
        setTimeout(juegoSuma,1000); ;valor1.style.backgroundColor = "lightgreen"
    }

    if (!resultado && !tieneSonido()){
        valor1.style.backgroundColor = "yellow"
    }
    
}
