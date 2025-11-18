    window.addEventListener("load", inicio);

    function inicio ()
    {
        instertTot()

        juegoSuma ()

        document.getElementById("juegoDif").addEventListener("click", clickear)

        document.getElementById("AgregarAlta").addEventListener("click",altaJugador)

        document.getElementById("idEnviarCalculaSuma").addEventListener("click",ResultadoSuma)

        document.getElementById("idEnviarComentario").addEventListener("click",comentario)

        
    };
 


    /** -------------------------------------------- COMIENZA JUEGO DE DIFERENCIA--------------------------------------------------------------**/


    let azarColsDif;
    let azarFilasDif;

    function instertTot ()
    { let tabla = document.getElementById("juegoDif");
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

    function instertDif (filas, columnas, numeroPareja, emojin)
    {
        let otro = 1
        if (emojin == 1) {otro = 0}

        let tabla = document.getElementById ("juegoDif")
        tabla.rows[filas].cells[columnas].innerHTML = parejas [numeroPareja][otro];
    }


    function AgregaATabla (conjunto, par, cantFil, CantCol)
    {
        let tabla = document.getElementById ("juegoDif")
        for (let i=0 ; i<CantCol ; i++)
            {
                let fila = tabla.insertRow ();
                

                for (let j=0 ; j<cantFil ; j++)
                    {
                        let cont = fila.insertCell ();
                        cont.innerHTML = parejas [conjunto][par]
                    }
            } return tabla
    }

    
    function clickear (evento)
    {
    let ResJuego1 = false 
    let celda = evento.target.closest("td");
    if (!celda) return;

    let fila = celda.parentNode.rowIndex ;
    let columna = celda.cellIndex ;
    

    if ((azarFilasDif == fila) && (azarColsDif == columna))
           {
            ResJuego1 = true
            setTimeout(instertTot, 1000);
            }

    if (ResJuego1 && tieneSonido()) {hacerSonido1()}

    if (!ResJuego1 && tieneSonido()) {hacerSonido2()}

    if (!tieneSonido() && ResJuego1) {alert("Correcto")}
    
    if (!tieneSonido() && !ResJuego1) {alert("Incorrecto")}
    };


function tieneSonido () 
{
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

function comentario ()
{
 let comentario = document.getElementById("Comentarios").value

}


function altaJugador ()
{
 
    let nombre = document.getElementById("Nombre").value
    let edad = document.getElementById("Edad").value

    let totalTabla =  document.getElementById("idtabla")
    let fila = totalTabla.insertRow()
    let izq = fila.insertCell()
    izq.innerHTML = nombre
    let der = fila.insertCell()
    der.innerHTML = edad
}

/** -------------------------------------------- TERMINA JUEGO DE DIFERENCIA--------------------------------------------------------------**/

/** -------------------------------------------- COMIENZA JUEGO DE LA SUMA--------------------------------------------------------------**/

let num1 = 0
let num2 = 0

function juegoSuma ()
{
 num1 = Math.trunc(Math.random()*10+1);
 num2 = Math.trunc(Math.random()*10+1);

let parrafo = document.getElementById("JuegoSuma")
parrafo.innerHTML = ("Sume " + num1 + " + " + num2)

}

function ResultadoSuma () 
{
 let resultado = false   
 let valor = document.getElementById("ResultSuma").value
 let valor1 = document.getElementById("ResultSuma")
 if (valor == (num1+num2)) {resultado = true; valor1.value = ""}

 if (resultado && tieneSonido()) 
    {hacerSonido1(); setTimeout(juegoSuma,1000);valor1.style.backgroundColor = "lightgreen"}

 if (!resultado && tieneSonido()) 
    {hacerSonido2();valor1.style.backgroundColor = "yellow"}

 if (resultado && !tieneSonido()) 
    {setTimeout(juegoSuma,1000); ;valor1.style.backgroundColor = "lightgreen"}

 if (!resultado && !tieneSonido()) 
    {valor1.style.backgroundColor = "yellow"}
    
 }
