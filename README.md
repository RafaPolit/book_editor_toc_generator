Book editor: TOC generator
==========================

Prueba de código 3 - Levelap, 28 de julio, 2014

La aplicación para crear y administrar publicaciones para una editorial está separada en 2 secciones: cliente y servidor.  Cada una de ellas independizada completamente de la otra.  La aplicación en servidor está desarrollada en NodeJS, mientras que la de cliente está diseñada como una 'single page application' sobre AngularJS.

Dependencias
------------
Dependencias para correr la aplicación:
* NodeJS v0.10.29
* MySQL Server

Dependencias para ejecutar los tests (de cliente):
* PhantomJS(*)


Instalación
-----------
Debe ejectuarse la instalación tanto en cliente como en servidor.
Cada bloque de comando debe ejecutarse desde la raíz del proeycto:

`$ cd server/
 $ sudo npm install`

`$ cd client/
 $ sudo npm install`







