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

```
$ cd server/
$ sudo npm install
```

```
$ cd client/
$ sudo npm install`
```


Testing
-------
Cada sección de la aplicación tiene su propia batería de tests, tanto *client* como *server*, y deben ejecutarse por separado.  Para ejecutar los tests, es necesario navegar a la sección de la aplicación correcta: _server_ o _client_.
Una vez en el directorio, se corren ejecutando:
```
$ npm test
```

(*) PhantomJS es un 'headless browser', cómodo para realizar los tests.  En caso de no tenerlo instalado, se puede correr el siguiente comando desde la carpeta _client_ para ejectuar los tests desde Chrome:
```
$ ./node_modules/karma/bin/karma start --singleRun true --browsers Chrome
```


Inicializar la acplicación
--------------------------
Desde la carpeta _server_ del proyecto, ejectuar:
```
$ npm start
```

Esto levanta un servidor en NodeJS en el **puerto 3000**

Utilizar la aplicación
----------------------
Desde un navegador Chrome o Firefox (se recomienda que esté actualizado a la última versión), navegar a la dirección:
```
localhost:3000
```

Estructura
----------
Cada sección de la aplicación tiene su carpeta individual

### Dentro de la carpeta _server_ :
* _app.js_ incluye la configuración global de NodeJS y Express
* La carpeta _modules_ incluye la funcionalidad principal de la aplicación:
    * La carpeta _books_ contiene las rutas y modelos.
    * La carpeta _utilities_ incluye la versión de servidor del toc_index_generator.
    * Cada carpeta tiene su respectiva carpeta _specs_ con los tests de jasmine.
* La carpeta _config_ incluye scripts de conexión a la base de datos.
* La carpeta _mocks_ incluye scripts que maquetan la aplicación y respuestas para efectos de testing.

### Dentro de la carpeta _client_ :
* _index.html_ incluye la base HTML5 de la aplicación y la carga de scripts para el navegador.
* La carpeta _scripts_ incluye la funcionalidad principal de la aplicación:
    * La carpeta _books_ contiene el grupo de List, Create, Edit y Show, así como servicios usados.
    * La carpeta _directives_ incluye las directivas de AngularJS para DOM Manipulation.
    * La carpeta _filters_ contiene los filtros de AngularJS para formato de datos.
    * La carpeta _underscore_ contiene el módulo *no_conflict* de la utilidad de objetos y arrelgos.
    * Cada carpeta tiene su respectiva carpeta de specs con los tests.
* La carpeta _styles_ contiene un pequeño CSS para extender Bootstrap 3.
* La carpeta components incluye los scripts JS de Jquery, Angular, Bootstrap, etc., que se usan en la aplicación.









