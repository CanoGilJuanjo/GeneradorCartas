addEventListener("DOMContentLoaded",()=>{
    let ruta = null;
    const SALDO_INICIAL = 500
    
    var saldoElimina = 0 //Saldo a eliminar cuando se "compre" un sobre
    actualizarSaldo() //Funcion para comprobar toda la logica de actualizar el sueldo y comprobar el toque al boton

    //Saldo inicial con el que cuentan todos los jugadores
    var saldo = SALDO_INICIAL;
    //Abortamos la creacion de las cartas si el saldo no es suficiente
    var abortarCarta = false
    //Vamos a comprobar si hay algun saldo de anteriores partidas
    if(localStorage.getItem("saldo")){
        saldo = parseInt(localStorage.getItem("saldo"))
    }else{
        localStorage.setItem("saldo",SALDO_INICIAL)
        saldo = SALDO_INICIAL
    }

    //llamamos a la funcion para que cree los sobres de partidas anteriores
    cartas(null)

    //Nada más cargar la pagina que se inserten los sobres que tenemos disponibles
    fetch("recursos/sobres/sobres.txt")
    .then(res => res.text())
    .then(res=>{
        res=res.split("\r\n")
        let divSobres = document.querySelector("#sobres")
        res.forEach(element => {
            element = element.split(",")
            divSobres.innerHTML+="<div'><img class='aumento' id='sobre"+element[1]+"' src='"+element[0]+"' alt='"+element[2]+"' style='width: 20vw;height: 20vh;cursor:pointer;'><p style='font-size:large;'>Precio: "+element[2]+" €</p></div>";
            document.querySelector("#sobre"+element[1]).nodeValue = element[2]+""
        });
        //Leer todos los "sobres" y seleccionar el que toca el usuario
        for(let divSobre of document.querySelector("#sobres").childNodes){    
            for(let elemento of divSobre.childNodes){
                if(elemento.nodeName == "IMG"){
                    elemento.addEventListener("click",function evento(){
                        for(let divSobre2 of document.querySelector("#sobres").childNodes){
                            for(let elemento2 of divSobre2.childNodes){
                                if(elemento2.nodeName == "IMG") {
                                    elemento2.style.border = "0px solid black"
                                }
                            }
                        }
                        ruta = "recursos/sobres/"+elemento.id+".csv";
                        elemento.style.border = "4px solid yellow";
                        saldoElimina = elemento.alt
                    })
                }   
            }
        }
    }).finally(res=>{
        document.querySelector("#saldo").innerHTML = "Saldo: "+saldo+" €";
    }) 
    
    
    var contador = 0;
    
    
    document.querySelector("#generar").addEventListener("click",()=>{
        if(ruta == null){
            document.getElementById("nombre").innerHTML = "No ha seleccionado ningun sobre"
            document.getElementById("imagen").src = ""
            document.getElementById("nacionalidad").innerHTML = "Seleccione un sobre para poder jugar"
            document.getElementById("precio").innerHTML = ""
        }else{
            fetch(ruta)
            .then(res=>res.text())
            .then(res=>{
                if(abortarCarta) {
                    document.getElementById("nombre").innerHTML = "No tiene saldo para comprara este sobre"
                    document.getElementById("imagen").src = ""
                    document.getElementById("nacionalidad").innerHTML = ""
                    document.getElementById("precio").innerHTML = ""
                }else{
                    //Lo convertimos todo a JSON
                    res = res.split("\r\n").slice(1,res.length)
                    let pilotos = [];
                    let posActual = 0
                    res.forEach(piloto =>{
                        piloto = piloto.split(",")
                        //Nombre,Dificultad,Nacionalidad,precio,IMG/ENLACE
                        let tem = {
                            nombre:piloto[0],
                            dificultad:piloto[1],
                            nacionalidad:piloto[2],
                            precio:piloto[3],
                            imagen:piloto[4]
                        }
                        //Probabilidades
                        /**
                            1 ------ 100
                            dificultad: 2 -> 20% de 100 
                            0-19
                            +
                            dificultad: 3 -> 30% de 100 pero quitando el anterior
                            20-49
                            +
                            dificultad: 2 -> 20% de 100 pero quitando todos los anteriores
                            50-69
                            +
                            dificultad: 3 -> 30%
                            70-99
                        */
                        tem.limiteInferior = posActual;
                        posActual = posActual+Math.floor(parseFloat(piloto[1])*10)
                        tem.limiteSuperior = posActual-1;
                        pilotos.push(tem)
                    })
                    
                    //Generamos un numero aleatorio entre 0-99
                    let numAleatorio = Math.floor((Math.random() * (posActual+1)))
                    //Comprobamos a que piloto corresponde el numero
                    let resultado = null;
                    for(let i = 0; i<pilotos.length && resultado == null;i++){
                        if(pilotos[i].limiteInferior<=numAleatorio && pilotos[i].limiteSuperior>=numAleatorio){
                            resultado = pilotos[i];
                        }
                    }

                    document.getElementById("nombre").innerHTML = resultado.nombre
                    document.getElementById("imagen").src = resultado.imagen
                    document.getElementById("nacionalidad").innerHTML = "Nacionalidad: "+resultado.nacionalidad
                    document.getElementById("precio").innerHTML = "Precio: "+resultado.precio
                    
                    cartas(resultado)
                }
            })
            .then(res=>{
                let carta = JSON.parse(localStorage.getItem("sobres"))
                for(let i = 0; i<carta.length; i++){
                    let nodo = document.querySelector("#carta_"+i);
                    (nodo)?
                        ()=>{
                            nodo.removeEventListener("click");
                            nodo.addEventListener("click",()=>{
                            saldo += parseInt(carta[i].precio)
                            localStorage.setItem("saldo",saldo)
                            document.querySelector("#saldo").innerHTML = "Saldo: "+saldo+" €";
                            carta.splice(i,1)
                            localStorage.setItem("sobres",JSON.stringify(carta))
                            cartas(null)
                        })}
                    :"";
                }
            })
        }
    })

    function cartas(resultado){
        //LocalStorage
            if(resultado == null || resultado == undefined){
                //Nombre,Nacionalidad,precio,IMG/ENLACE
                document.querySelector(".inventario").innerHTML = "";
                if(localStorage.getItem("sobres")){
                    let sobres = JSON.parse(localStorage.getItem("sobres"))
                    for(let i=0;i<sobres.length;i++){
                        if(sobres[i].nombre.toLowerCase().split(" ").includes("fernando")||sobres[i].nombre.toLowerCase().split(" ").includes("alonso"))
                        {document.querySelector(".inventario").innerHTML+=`
                            <div class="tarjeta fernando" style="margin:5px;">
                                <div class="titulo">${sobres[i].nombre}</div>
                                <div class="cuerpo">
                                    <p>Nacionalidad: ${sobres[i].nacionalidad}</p>
                                    <p>Precio: ${sobres[i].precio} €</p>
                                    <img src="${sobres[i].imagen}" alt="" style="max-width:60%;">
                                </div>
                                <div class="pie" id="">
                                    <button class="vender" id="carta_${i}" style="background-color:green;color:white;padding:5px;margin:5px;border-radius:10px;font-size:large;">$$</button>
                                </div>
                            </div>
                        `}
                        else
                        {document.querySelector(".inventario").innerHTML+=`
                            <div class="tarjeta" style="margin:5px;">
                                <div class="titulo">${sobres[i].nombre}</div>
                                <div class="cuerpo">
                                    <p>Nacionalidad: ${sobres[i].nacionalidad}</p>
                                    <p>Precio: ${sobres[i].precio} €</p>
                                    <img src="${sobres[i].imagen}" alt="" style="max-width:60%;">
                                </div>
                                <div class="pie" id="">
                                    <button class="vender" id="carta_${i}" style="background-color:green;color:white;padding:5px;margin:5px;border-radius:10px;font-size:large;">$$</button>
                                </div>
                            </div>
                        `}
                        ;
                        let carta = JSON.parse(localStorage.getItem("sobres"))
                        for(let j = 0; j<carta.length; j++){
                            let nodo = document.querySelector("#carta_"+j);
                            (nodo)?
                                ()=>{nodo.removeEventListener("click");
                                    nodo.addEventListener("click",()=>{
                                    saldo += parseInt(carta[j].precio)
                                    localStorage.setItem("saldo",saldo)
                                    document.querySelector("#saldo").innerHTML = "Saldo: "+saldo+" €";
                                    carta.splice(j,1)
                                    localStorage.setItem("sobres",JSON.stringify(carta))
                                    cartas(null)
                               })}
                               :"";
                        }
                    }
                }
            }else
                //Nombre,Nacionalidad,precio,IMG/ENLACE
                if(localStorage.getItem("sobres")){
                    let sobres = localStorage.getItem("sobres")
                    sobres = JSON.parse(sobres)
                    sobres.push(resultado)
                    localStorage.setItem("sobres",JSON.stringify(sobres))
                }else{
                    localStorage.setItem("sobres", JSON.stringify([resultado]));
                }

                if(localStorage.getItem("sobres")){
                    let sobres = JSON.parse(localStorage.getItem("sobres"))
                    document.querySelector(".inventario").innerHTML = "";
                    for(let i=0;i<sobres.length;i++){
                        if(sobres[i].nombre.toLowerCase().split(" ").includes("fernando")||sobres[i].nombre.toLowerCase().split(" ").includes("alonso"))
                            {document.querySelector(".inventario").innerHTML+=`
                                <div class="tarjeta fernando" style="margin:5px;">
                                    <div class="titulo">${sobres[i].nombre}</div>
                                    <div class="cuerpo">
                                        <p>Nacionalidad: ${sobres[i].nacionalidad}</p>
                                        <p>Precio: ${sobres[i].precio} €</p>
                                        <img src="${sobres[i].imagen}" alt="" style="max-width:60%;">
                                    </div>
                                    <div class="pie" id="">
                                        <button class="vender" id="carta_${i}" style="background-color:green;color:white;padding:5px;margin:5px;border-radius:10px;font-size:large;">$$</button>
                                    </div>
                                </div>
                            `}
                            else
                            {document.querySelector(".inventario").innerHTML+=`
                                <div class="tarjeta" style="margin:5px;">
                                    <div class="titulo">${sobres[i].nombre}</div>
                                    <div class="cuerpo">
                                        <p>Nacionalidad: ${sobres[i].nacionalidad}</p>
                                        <p>Precio: ${sobres[i].precio} €</p>
                                        <img src="${sobres[i].imagen}" alt="" style="max-width:60%;">
                                    </div>
                                    <div class="pie" id="">
                                        <button class="vender" id="carta_${i}" style="background-color:green;color:white;padding:5px;margin:5px;border-radius:10px;font-size:large;">$$</button>
                                    </div>
                                </div>
                            `}
                            ;
                        let carta = JSON.parse(localStorage.getItem("sobres"))
                        for(let j = 0; j<carta.length; j++){
                            (document.querySelector("#carta_"+j))?document.querySelector("#carta_"+j).addEventListener("click",()=>{
                                saldo += parseInt(carta[j].precio)
                                localStorage.setItem("saldo",saldo)
                                document.querySelector("#saldo").innerHTML = "Saldo: "+saldo+" €";
                                carta.splice(j,1)
                                localStorage.setItem("sobres",JSON.stringify(carta))
                                cartas(null)
                            }):"";
                        }
                    }
                }
                if(document.querySelector(".fernando")){
                    document.querySelector(".fernando").addEventListener("click",()=>{contador++;
                        if(contador == 33){
                        console.log("hola");
                        document.getElementById("ms").play()
                    }})
                }
    }

    function limpiarLocalStorage(){
        localStorage.clear()
        cartas(null)
        document.querySelector("#saldo").innerHTML = "Saldo: "+SALDO_INICIAL+" €";
        saldo = SALDO_INICIAL
        abortarCarta = false;
    }
    document.querySelector("#limpiar").addEventListener("click",limpiarLocalStorage)
    
    function actualizarSaldo(){ 
        document.querySelector("#generar").addEventListener("click",()=>{
            calcSaldo(saldoElimina)
        })
    }

    //Lo dejo en dos funciones por si se quiere reutilizar esta funcion para sumar dinero al saldo
    function calcSaldo(resta){
        resta = parseInt(Math.floor(parseFloat(resta)))
        if(saldo-resta<0){
            abortarCarta = true
        }else{
            abortarCarta = false;
            saldo -= resta;
            document.querySelector("#saldo").innerHTML = "Saldo: "+saldo+" €";
            localStorage.setItem("saldo",saldo)
        }
    }


    document.querySelector("#pollo").addEventListener("click",()=>{document.querySelector("#pollo").innerHTML="🐣"})
})




/*******************
 * Este código es de libre uso y modificación.
 * This code is free to use or modify
 * 
 * 
 * Creditos: polloslokos2015
 * Credits: polloslokos2015
 * 
 * youtube: https://www.youtube.com/@polloslokos
 * 
 */