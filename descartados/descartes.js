//Contador tiene que ir en la parte superior como variable globar que se pueda modificar (let/var)
let contador = 0;
let salir = false;
fetch("../../Downloads/inventario.csv").then(res=>{
    
    console.log(res.status);
})

/* do{
    if(contador == 0)
        fetch("../../downloads/inventario.csv").then(res=>{
            contador++;
        }).catch(err=>{
            salir = true;
        })
    else
        fetch("../downloads/inventario ("+contador+").csv").then(res=>{
            contador++;
        })
        .catch(err=>{
            salir = true;
        })
}while(!salir) */
//contador-1 siempre
//console.log("Paso la 1º comprobacion");

/* if(contador == 0){
    salir = false;
    do{
        fetch("../../downloads/inventario ("+contador+").csv").then(res=>{
            contador++;
        })
        .catch(err=>{
            salir = true;
        })
    }while(!salir && contador < 100)
}else{
    fetch("../Downloads/inventario ("+(contador-1)+").csv")
} */


/* 
    // Función para crear y descargar el archivo de texto

    // Contenido del archivo
    const contenido = "";
    
    // Crear un blob (objeto de tipo archivo)
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    console.log(url)
    // Crear un enlace para descargar el archivo
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'inventario.csv'; // Nombre del archivo a descargar

    // Simular clic en el enlace para iniciar la descarga
    document.body.appendChild(enlace);
    enlace.click();

    // Limpiar el DOM
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url); // Liberar la URL del blob 
*/