##############################################################################
#           INFORMACION PARA FUNCIONAMIENTO DEL JUEGO                        #
##############################################################################


**El juego necesita un interprete para las rutas a recursos/sobres, de la manera en la que
esta hecho ahora mismo no funciona si no se tiene en cuenta esto.
Cualquiera es libre de reestructurar el codigo si conoce alguna manera de que JS nativo interprete 
las rutas y lea el contenido TXT de los archivos **

##############################################################################
#           INSTRUCCIONES PARA FUNCIONAMIENTO DEL JUEGO                      #
##############################################################################

1º - Instalar VS code u otro IDE que permita la instalción de un servidor web o utilizar un servidor web local/online.

2º - Crear en la carpeta recursos/sobres los sobres con las cartas a gusto personal, se pueden modificar o añadir
nuevas cartas y sobres.

Para esto añadir un nuevo sobreX.csv, siendo X un numero que no se repita con respecto a otro sobre ya existente, con la información de las cartas que quieres que se generen siguiendo este formato:
                
               - Nombre,Dificultad,Nacionalidad,precio,IMG/ENLACE
               - Nombre: Sera el titulo que aparecera cuando la carta salga del sobre.
               - Dificultad: Probabilidad que se le asigna a cada sobre, la probabilidad total debe ser 10 al sumar todas las probabilidades individuales, se permiten decimales para precisar mejor las probabilidades, pero no numeros                      negativos.
               - Nacionalidad: Información extra no obligatoria, se puede dejar NaN si no se quiere rellenar o como "", pero debe aparecer en la linea de la carta.
               - Precio: Cantidad de dinero/monedas que se daran al usuario una vez que venda la carta que ha conseguido, los precios no pueden ser negativos pero si decimales.
               - IMG/ENLACE: Si se quiere usar una imagen local, se tengra que poner la ruta relativa con respecto al index.js de dicha imagen, sino se puede poner una URL de internet para facilitar la creación.
                
Ejemplo:
Fernando Alonso Renault 2005,1,Español,180,https://images.daznservices.com/di/library/DAZN_News/f1/38/fernando-alonso-interlagos-2005_koxaatmhx5s31mu2omoyxsyu6.jpg?t=-538406268

Si no sigue este formato se generaran errores e incoherencias en el codigo dejando de funcionar como es esperado.

3º - Añadir este nuevo sobre a la lista de sobres permitidos para el juego, hay un archivo "sobres.txt" en la carpeta
"recursos/sobres" que nos permite añadir el sobre que queramos o quitar el que no queramos.

    COMO FUNCIONA:

Dentro de sobres.txt tenemos el siguiente formato:
Foto,id del sobre a añadir (aqui nos referimos al numero del sobre que contiene las cartas, generado en el paso 2, seria la X del sobreX.csv),Precio que queremos que tenga este sobre.

               - Foto: Sera la imagen que aparecera en la pagina del juego, si no se pone una foto aparecera un recuadro (depende del navegador).
               - ID del sobre: Es el numero que asignamos en el paso 2 en el nombre del archivo .csv, lo usamos para identificar de que sobre hay que cargar los datos.
               - Precio: Para que el juego sea más entretenido los sobres tienen que tener un precio que nos descontaran de nuestro saldo cada vez que compremos un sobre, este precio tiene que ser un promedio de los precios del sobre                    para que sea más entretenido, pero hay libertad a la hora de que poner, solamente no se permiten negativos pero si decimales.

Ejemplo:
https://www.autohebdo.fr/app/uploads/2024/04/DPPI_00124005_200-753x494.jpg,2,50

4º - Disfrutar jugando.




##############################################################################
#                           EASTER EGGS ESCONDIDOS                           #
##############################################################################

Dentro del codigo hay 3 Easter Eggs escondidos que hacen referencia al canal EranInters, el mundo de la F1 en general y mi canal

¡¡Suerte encontrandolos!!
