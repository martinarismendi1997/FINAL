    /*Gustavo Falco (estudiante 218814) y Martin Arismendi (estudiante 353787)*/
    
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

        document.getElementById("orden1").addEventListener("change", actualizarTablaDatos)
        document.getElementById("orden2").addEventListener("change", actualizarTablaDatos)
        document.getElementById("iddestacar").addEventListener("input", actualizarTablaDatos)
        document.getElementById("AgregarAlta").addEventListener("click",altaJugador)
        document.getElementById("juegoDif").addEventListener("click", EligioJugador)
        document.getElementById("idEnviarCalculaSuma").addEventListener("click",EligioJugadorSuma)
        document.getElementById("idEnviarComentario").addEventListener("click",comentario)     
        document.getElementById("idActualizarComentarios").addEventListener ("click", actualizarComentariosEditados)

        actualizarTablaDatos();
        actualizarListaNuncaJugaron();
        actualizarListaMasComentaron();
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
            actualizarListaNuncaJugaron();
            actualizarListaMasComentaron();
            actualizarTablaDatos();

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
        actualizarListaNuncaJugaron();
        actualizarListaMasComentaron();
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
        if (!eligio) {
            alert("Debe seleccionar un jugador")
        } 
        else {
            ResultadoSuma ()
        }

    }
function ResultadoSuma (){
    let resultado = false   
    let valor1 = document.getElementById("ResultSuma")
    let valor = valor1.value;

    valor1.style.backgroundColor = "white";
    
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
    actualizarListaNuncaJugaron();
    actualizarListaMasComentaron();

    if (resultado && tieneSonido()){
        valor1.style.backgroundColor = "lightgreen";
        hacerSonido1(); 
        setTimeout(juegoSuma,1000);        
    }

    if (!resultado && tieneSonido()){ 
        valor1.style.backgroundColor = "yellow";
        hacerSonido2();        
    }

    if (resultado && !tieneSonido()){
        valor1.style.backgroundColor = "lightgreen";
        setTimeout(juegoSuma,1000);        
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
    actualizarListaNuncaJugaron();
    actualizarListaMasComentaron();
    document.getElementById("Comentarios").value = ""; /*vaciamos el contenido de comentarios*/
}

function actualizarTablaDatos() {

    let tabla = document.querySelector("#idtabla tbody");
    tabla.innerHTML = "";

    let opcion = document.querySelector('input[name="orden"]:checked').value;
    let listaJugadores = sistema.jugadores.slice();
    
    if (opcion === "nombre_creciente") { 
        listaJugadores.sort(function(a, b) {
            if (a.nombre < b.nombre) return -1;
            if (a.nombre > b.nombre) return 1;
            return 0;
        });

    } else if (opcion === "edad_creciente") {
        listaJugadores.sort(function(a, b) {
            return a.edad - b.edad;
        });
    }

    let palabra = document.getElementById("iddestacar").value.trim().toLowerCase();

    for (let j = 0; j < listaJugadores.length; j++) {
        let jug = listaJugadores[j];
        let fila = tabla.insertRow();
        fila.insertCell().textContent = jug.nombre;
        fila.insertCell().textContent = jug.edad;        
        let comentario = "";
        if (jug.comentarios.length > 0) {
            comentario = jug.comentarios[jug.comentarios.length - 1].texto;
        }        
        if (palabra !== "" && comentario.toLowerCase().includes(palabra)) {
            let comentarioMinus = comentario.toLowerCase();
            let palabraMinus = palabra.toLowerCase();
            let resultado = "";
            let k = 0;
            while (k < comentario.length) {
                if (comentarioMinus.startsWith(palabraMinus, k)) {
                    let original = comentario.substring(k, k + palabra.length);
                    resultado += '<span style="color:red;">' + original + '</span>';
                    k += palabra.length;
                } 
                else {
                    resultado += comentario[k];
                    k++;
                }
            }
            comentario = resultado;
        }
        let celdaComentario = fila.insertCell();
        celdaComentario.innerHTML = comentario;
    }
}

function actualizarComentario() {

    let tabla = document.querySelector("#idTablaAdmComentario tbody");
    tabla.innerHTML = "" /*reseteamos para comenzar*/

    let lista = sistema.comentarios.slice();

    lista.sort(function(a, b) { /*ordenamos la lista por hora*/
    if (a.hora < b.hora) { 
        return -1; 
    }
    if (a.hora > b.hora) { 
        return 1; 
    }
    return 0; /*si son iguales retorna 0*/
    });

    for (let i = 0; i < lista.length; i++) {
        let aux = lista[i];
        let fila = tabla.insertRow(); /* creamos fila nueva*/

        /*Cargamos en las celdas: nombre, hora y comentario*/
        fila.insertCell().textContent = aux.nombre; /*no usamos innerHTML*/
        fila.insertCell().textContent = aux.hora;
        
        let celdaComentario = fila.insertCell();
        let input = document.createElement("input");
        input.type = "text";
        input.value = aux.texto;
        celdaComentario.appendChild(input);
    }
    
}

function actualizarComentariosEditados() { /*con ayuida de ChatGPT porque no nos salia el codigo*/

    let tabla = document.querySelector("#idTablaAdmComentario tbody");
    let filas = tabla.getElementsByTagName("tr");

    let listaOrdenada = sistema.comentarios.slice(); 

    listaOrdenada.sort(function(a, b) {
        if (a.hora < b.hora) return -1;
        if (a.hora > b.hora) return 1;
        return 0;
    });

    for (let i = 0; i < filas.length; i++) {
        let inputComentario = filas[i].querySelector("input");        
        let nuevoTexto = inputComentario.value;
        let comentarioOriginal = listaOrdenada[i];
        comentarioOriginal.texto = nuevoTexto;
    }
    
    actualizarComentario();
    actualizarTablaDatos();
    actualizarTablaResumen();
    actualizarListaNuncaJugaron();
    actualizarListaMasComentaron();

    alert("Comentarios actualizados correctamente.");
}

function actualizarTablaResumen() {
    
    let tabla = document.querySelector("#idtablaAdmResumen tbody");    
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

/*--------------------------------------------------------------------------------------------------*/

function actualizarListaNuncaJugaron() {    
    let lista = document.getElementById("idListaJugNucaJuega"); /*creamos la lista de jugadores que nunca jugaron*/
    lista.innerHTML = "";

    let listaCopia = sistema.jugadores.slice();
    listaCopia.sort(function(a, b) {
        if (a.nombre < b.nombre) return -1;
        if (a.nombre > b.nombre) return 1;
        return 0;
    });
    
    for (let i = 0; i < listaCopia.length; i++) { /*recorremos la lista de jugadores para verificar quien no jugo*/
        let jug = listaCopia[i]; /*esta variable es para revisar todos los jugadores*/
        
        let nuncaJugo = /*esta variable es para verificar cada jugador si jugo o no*/
            jug.difOK === 0 &&
            jug.difMal === 0 &&
            jug.sumaOK === 0 &&
            jug.sumaMal === 0;
        
        if (nuncaJugo) { /*si es true se agrega, si es false no se agrega*/
            let noJugo = document.createElement("li"); 
            noJugo.textContent = jug.nombre + " (" + jug.edad + " años)";
            lista.appendChild(noJugo);
        }
    }
}

function actualizarListaMasComentaron() {

    let lista = document.getElementById("idListaJugMayorCant");
    lista.innerHTML = "";

    let jugadoresOrdenados = sistema.jugadores.slice(); /*Clonamos la lista para trabajar*/

    jugadoresOrdenados.sort(function(a, b) { /*la ordenamos*/
        return b.comentarios.length - a.comentarios.length;
    });

    for (let i = 0; i < jugadoresOrdenados.length; i++) {
        let jug = jugadoresOrdenados[i];
        let li = document.createElement("li");
        li.textContent = jug.nombre + " — " + jug.comentarios.length + " comentarios";
        lista.appendChild(li);
    }
}
