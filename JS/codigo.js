window.addEventListener("load", inicio);

function inicio ()
{
    instertTot()
    document.getElementById("juegoDif").addEventListener("click",instertTot)

    document.getElementById("AgregarAlta").addEventListener("click",altaJugador)

    document.getElementById("idEnviarComentario").addEventListener("click",comentario)
};
    

function altaJugador ()
{
let nombre = document.getElementById("Nombre").value
let edad = document.getElementById("Edad").value
let jugador = new jugador (nombre, edad)


}




function instertTot ()
{ let tabla = document.getElementById("juegoDif");
  tabla.innerHTML = ""

  let azarPareja = Math.trunc(Math.random()*parejas.length); //Ver esta parte porque creo que no toma todos los arreglos
  let azarFilas = Math.trunc(Math.random()*3+2);
  let azarCols = Math.trunc(Math.random()*3+2);
  let repetido = Math.trunc(Math.random()*2);

  let azarColsDif = Math.trunc(Math.random()*azarCols-1);
  let azarFilasDif = Math.trunc(Math.random()*azarFilas-1);

     alert(azarColsDif + " " + azarFilasDif)
  
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

function obtenerPosicionCelda(evento) {
    const celda = evento.target.closest("td");
    if (!celda) return null;

    const fila = celda.parentNode.rowIndex;
    const columna = celda.cellIndex;

    return { fila, columna };}



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