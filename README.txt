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

1º - Instalar VS code u otro IDE que permita la instalción de un servidor web o utilizar un servidor web local/online

2º - Crear el la carpeta recursos/sobres los sobres con las cartas a gusto personal, se pueden modificar o añadir
nuevas cartas y sobres a gusto personal.

Para esto añadir un nuevo sobreX.csv con la informacion de las cartas que quieres que se generen siguiendo este formato:
                
                Nombre,Dificultad,Nacionalidad,precio,IMG/ENLACE
                Ejemplo:
Fernando Alonso Renault 2005,1,Español,180,https://images.daznservices.com/di/library/DAZN_News/f1/38/fernando-alonso-interlagos-2005_koxaatmhx5s31mu2omoyxsyu6.jpg?t=-538406268

Si no sigue este formato se generaran errores e incoherencias en el codigo dejando de funcionar como es esperado

3º - Añadir este nuevo sobre a la lista de sobres permitidos para el juego, hay un archivo sobres.txt en esta carpeta de sobres
recursos/sobres que nos permite añadir el sobre que queramos o quitar el sobre que queramos

    COMO FUNCIONA:

Dentro de sobres.txt tenemos el siguiente formato:
Foto,id del sobre a añadir (aqui nos referimos al numero del sobre que contiene las cartas, generado en el paso 2, seria la X del sobreX.csv),Precio que queremos que tenga este sobre

por ejemplo:
https://www.autohebdo.fr/app/uploads/2024/04/DPPI_00124005_200-753x494.jpg,2,50

4º - Disfrutar jugando




##############################################################################
#                           EASTER EGGS ESCONDIDOS                           #
##############################################################################

Dentro del codigo hay 3 Easter Eggs escondidos que hacen referencia al canal EranInters, el mundo de la F1 en general y mi canal

¡¡Suerte encontrandolos!!