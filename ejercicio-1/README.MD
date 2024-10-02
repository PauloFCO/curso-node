**¿Qué es Node.js** Es un entorno de ejecución de JavaScript, es decir, un sitio donde se puede ejecutar JavaScript. Esto significa que nos permite ejecutar JavaScript en muchísimos entornos en donde esté embebido Node.js.
Es multi-plaforma, asíncrono, con IO de datos, con arquitectura orientada a eventos,...
Utiliza V8 que es el motor de JavaScript que utiliza Chrome. El navegador Chrome ejecuta muy rápido JavaScript. 

**Orientado a eventos**: tiene un bucle que va manejando las solicitudes que le van llegando, en lugar de esperar bloqueos, va ejecutando tareas mientras espera respuestas que ha dejado por ahí. **Lo hace en un solo Thread**. Es mono-hilo. Al estar orientado a eventos, "aparca" ciertas tareas para luego de manera que parece que hace varias a la vez, pero esto no es así ya que es mono-hilo. 

**¿Por qué aprender Node.js:**
1. Demanda. Se utiliza a nivel mundial. No se limita al backend. VsCode usa node.js, muchos comandos en la terminal,... (A la unión de MongoDB, Express.js, React y Node.js se le llama **MERN**). Node.js utiliza a si mismo Node.js.
2. Se puede usar todos los conocimientos de js pero en Node.js muy rápidamente. (Ya que no es más que eso). Se es productivo de manera muy rápida.
3. Se puede crear APIs, app webs, servicios sin complejidades, utilidades,... muchas cosas. 
4. Comunidad inmensa. Ecosistema enorme.
5. Rápido escalable y fácil de desplegar (barato o gratis). El hecho de ser mono-proceso no tiene que ser igual a lento. Puede ser que consuma más memoria que otras soluciones.
6. Se creó mejorando Apache que no era tan eficiente para responder a muchas conexiones de forma concurrente.
7. Forma parte de la OpenSource Fundation, por lo que es totalmente de código abierto.

Al descargar Node.js y al ejecutar node tendremos acceso al **repl**.

#### Básico 1
Simplemente para iniciar añadiremos un archivo js (index.js):
``` js
console.log('Hola, mundo!')
```
Ahora en el terminal le decimos cual es el archivo que queremos ejecutar:
``` shell
node index.js
```

En Node.js no tenemos window, no podemos hacer:
```js
console.log(window)
```

### Variables globales
Node.js es un entorno de ejecución totalmente diferente al navegador por lo que no tenemos window.

Si tenemos un **objeto global**, este es ***globalThis**. 

Es la variable global tanto de Node.js como para el navegador de todos.
Si hacemos un console.log del globalThis, obtenemos la salida:
``` js
<ref *1> Object [global] {
  global: [Circular *1],
  clearImmediate: [Function: clearImmediate],       
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  structuredClone: [Function: structuredClone],
  atob: [Getter/Setter],
  btoa: [Getter/Setter],
  performance: [Getter/Setter],
  fetch: [Function: fetch],
  navigator: [Getter],
  crypto: [Getter]
}
```

globalThis es una variable global en toda nuestra aplicación. Vamos a poder acceder a ella no importa donde estemos. 
Sin embargo, en el navegador, esta variable, apunta a window, pero resulta que en Node.js esta apunta a global. Pero la forma realmente correcta para referirnos a esta variable global es a través de globalThis. 

¿Por qué podemos usar *console*?
En console.log, no nos preguntamos de donde sale console. Realmente viene de globalThis, siendo posible:
``` js
globalThis.console.log('Hola')
```

Cualquier cosa que parece que sale de la nada, realmente sale de globalThis. 
### Patrón de diseño Módulo
Es un patrón de diseño en el cual separaremos nuestro código en diferentes ficheros y los vamos a poder importar y exportar para que ese código se reutilice. 

Por ejemplo: para una suma podríamos tener un fichero sum.js:
``` js
function sum (a, b) {
    return a + b
}
```

Pero esto lo podremos usar si indicamos que se trata de un **Módulo**.

Para ello indicamos que deseamos exportar el módulo de la manera:
``` js
function sum (a, b) {
    return a + b
}

module.exports = sum
```

Y ahora lo usaremos de la forma en el index.js:
``` js
const sum = require('./sum')

console.log(sum(1, 2))
```
Así funciona igual y se trataría de crear un objeto lo que se hace es exportar un objeto en donde se tenga una llave que sea.
Y como tiene el mismo nombre sum que la función, lo que se estaría exportando sería la función. 
``` js
module.exports = {
    sum
}
```

Esta estructuración de los módulos se le llamaría **CommonJS**. 

Hay otra forma que es la más utilizada. Otra forma de importar y exportar módulos. La anterior es la forma tradicional, pero esta es una evolución: 
Esta forma se le llama **ES Modules**. Para ello creamos una carpeta cjs y metemos el index.js que hemos creado además del sum.js. Luego creamos otro index.js fuera de esta carpeta comentada, pero en este caso le cambiaremos el nombre de la extensión a index.mjs. (Esto lo hacemos para tener separadas las dos formas, es decir, cjs sería CommonJS y el resto en ES Modules)

Ahora podremos utilizar sum de la forma:

``` js
import { sum } from './sum.mjs'
console.log(sum(1, 2));
```

Obviamente ahora necesitaremos crear sum.mjs, pero de esta forma será:
``` js
export function sum (a, b) {
    return a + b
}
```

Este es el sistema de módulos que más se usa y que se debería usar siempre que se pueda. 
Ahora se ejecutaría de la forma:
``` shell
node index.mjs
```

**Nota: ** Vamos a usar CommonJS hasta que no se vea el package.json y como cambiarlo sin necesidad de cambiar la extensión.

### Módulos Nativos
Node.js al ser un entorno de ejecución nos da una biblioteca enorme de módulos nativos que nos darán acceso al sistema de archivos, al sistema operativo, a internet...

El primer módulo será:
``` js
const os = require('node:os')
```

Este nos dará información sobre el sistema operativo:

En un nuevo index.js:
``` js
const os = require('node:os')

console.log('Información del sistema operativo: ')
console.log('-----------------------------------')


console.log('Nombre del sistema operativo: ', os.platform())
console.log('Versión del sistema operativo: ', os.release())
console.log('Arquitectura del sistema operativo: ', os.arch())
console.log('CPUs: ', os.cpus()) // vamos a poder escalar procesos en Node

console.log('Memoria libre: ', os.freemem() / 1024 / 1024)
console.log('Memoria total: ', os.totalmem() / 1024 / 1024)
```

Ahora vamos a usar otro, este usara el sistema de archivos. 'File sistem'. **IMPORTANTE ESTE MÓDULO**

Es de los módulos más importantes de Node.js.
Recomendable importar los módulos de esta manera, con el node:
``` js
const fs = require('node:fs')
```

Empezamos escribiendo "Hola mundo!" en un txt y en el archivo 2.fs.js lo trabaremos: 
``` js
const fs = require('node:fs')

const stats = fs.statSync('./archivo.txt')
console.log(
  stats.isFile(),
	stats.isDirectory(),
	stats.isSymbolicLink(), // si es un enlace simbólico
	stats.size // tamaño en bytes
)
```
Ahora vamos a crear otro archivo que lo que hace es poder leer un archivo:

``` js
const fs = require('node:fs')

const text = fs.readFileSync('./archivo.txt', 'utf-8')

console.log(text)
```

Una nota con la codificación utf-8, porque sin especificar la codificación nos devolverá un buffer con bytes y no vamos a poder entender. Normalmente en español va a ser esta. 

Ahora vamos a intentar leer dos archivos. Para ello cree otro archivo llamado archivo2.txt y: 

``` js
const fs = require('node:fs')


console.log("Leyendo el primer archivo...")
const text = fs.readFileSync('./archivo.txt', 'utf-8')
console.log(text)


console.log("Leyendo el segundo archivo...")
const secondText = fs.readFileSync('./archivo2.txt', 'utf-8')
console.log(secondText)
```

A ido de forma síncrona, de forma secuencial. 
El problema es que ahora, mientras se lee uno de los archivos, no se va a poder hacer otra cosa, ahí en donde entra la importancia de la forma asíncrona. Async.

### Asincronía
Cómo se puede hacer asíncrono:
Vamos a ver como transformar a asíncrono, como transformarlo a promesas y porqué es tan importante. 

Lo primero que necesitamos es usar otro método: "readFile" ya que readFileSync lo hace de manera síncrona. 
Ahora hace falta un mecanismo que avisa cuando se ha terminado de leer el archivo. Este recibe el nombre de callbacks. Estas son funciones que se ejecutan cuando una tarea ha terminado.  Es por esto que esta función readFile acepta un callback como parámetro:

``` js
const text = fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
    console.log(text)
})
```

Es decir, cuando termines de leerlo sigue ejecutando, y cuando te avise ejecuta el callback.

``` js
const fs = require('node:fs')

console.log("Leyendo el primer archivo...")
fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
    console.log(text)
})

console.log("Haciendo cosas mientras lee el archivo...")

console.log("Leyendo el segundo archivo...")
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
    console.log(text)
})
```
Ahora está haciendo las cosas asíncronas. 

#### Promesas
Vamos a pasar esta información con las promesas, de manera que se pueda hacer de manera asíncrona sin callbacks:

``` js
const fs = require('node:fs/promises')

console.log("Leyendo el primer archivo...")
fs.readFile('./archivo.txt', 'utf-8')
    .then(text => {
        console.log(text)
    })

console.log("Haciendo cosas mientras lee el archivo...")

console.log("Leyendo el segundo archivo...")
fs.readFile('./archivo2.txt', 'utf-8')
    .then(text => {
        console.log(text)
    })

```

De forma clásica se utilizó callbacks, ahora muchos módulos de Node.js ya está la posibilidad de usar promises.


Node.js tiene una forma de transformar callbacks por si el módulo no trae las promesas:
``` js
const { promisify } = require('node:util')

const readFilePromise = promisify(fs.readFile)
```

Tan fácil como esto nos crea la versión con promesas.
``` js
const fs = require('node:fs')
const { promisify } = require('node:util')

const readFilePromise = promisify(fs.readFile)

console.log("Leyendo el primer archivo...")
fs.readFilePromise('./archivo.txt', 'utf-8')
	.then(text => {
		console.log("primer texto:", text)
	})

console.log("Haciendo cosas mientras lee el archivo...")

console.log("Leyendo el segundo archivo...")
fs.readFilePromise('./archivo2.txt', 'utf-8')
	.then(text => {
		console.log("segundo texto:", text)
	})

```

Obviamente cuando es posible usar el nativo mejor si se le permite. 

#### Async await
Lo que pasa es que ES Modules si tiene soporte para incluir await en el cuerpo, mientras que CommonJS no. 

Entonces usando ES Modules:
``` js
import { readFile } from 'node:fs/promises'

console.log("Leyendo el primer archivo...")
const text = await readFile('./archivo.txt', 'utf-8')
console.log('primer texto: ', text)

console.log("Haciendo cosas mientras lee el archivo...")

console.log("Leyendo el segundo archivo...")
const secondText = await readFile('./archivo2.txt', 'utf-8')
console.log('segundo texto: ', secondText)
```

Se podría hacer con CommonJS pero con una función autoinvocada. IIFE Inmediatly invoked function expression.
##### Paralelo
Lo primero es definir las promesas que queremos tratar:
``` js
import { readFile } from 'node:fs/promises'

Promise.all([
	readFile('./archivo.txt', 'utf-8'),
	readFile('./archivo2.txt', 'utf-8')
]).then(([text, secondText]) => {
	console.log('primer texto:', text)
	console.log('primer texto:', secondText)
})

```

Esto va a ser más rápido ya que se hace en paralelo. Termina de leer los dos archivos y cuando acabe continua. 

#### Resumen sincronia Vs Asincronos

![[Pasted image 20240930204724.png]]

![[Pasted image 20240930204742.png]]

### Path
Módulo nativo. Manejaremos las rutas de nuestros archivos. 
Crear rutas de esta manera: './content/...' no se puede hacer por el SO. Por las barras.
En windows por ejemplo es la barra invertida.

Para crear la ruta sería de esta forma:
``` js
const filePath = path.join('content', 'subfolder', 'test.txt')
```
La salida es:
``` shell
content\subfolder\test.txt
```

Otras funciones con el path: 
+ basename: devuelve el nombre del fichero al que se está accediendo. Se puede pasar como segundo parámetro que se quite la extensión de lo que devuelve.
+ extname: devuelve la extensión. Se suele usar más de lo que parece.

### Primera aplicación
Se trata de hacer un el comando ls. 
Para ello se usará readdir: Reads the contents of a directory. The callback gets two arguments `(err, files)` where `files` is an array of the names of the files in the directory excluding `'.'` and `'..'`.

``` js
const fs = require('node:fs')

fs.readdir('.', (err, files) => {
    if(err){
        console.err('Error al leer el directorio: ', err)
        return;
    }

    files.forEach(file => {
        console.log(file)
    })

})
```

Se podría manejar de otra forma el error si se tratase de una promesa:
``` js
const fs = require('node:fs/promises')

fs.readdir('.') 
	.then(files => {    
		files.forEach(file => {
				console.log(file)
		});
	})
	.catch(err => {
		if(err){
			console.err('Error al leer el directorio: ', err)
			return;
		}
	})
```



### Objeto process
Objeto global que proporciona información y control sobre el proceso actual de ejecución. Tiene propiedades y métodos que permiten interactuar con el entorno de ejecución de node.js y da información relacionada con el proceso actual. 

Por ejemplo los argumentos de la línea de comandos:
``` js
console.log(process.argv)
```
Al ejecutar nos devolverá los argumentos que ha recibido.
``` shell
node 7.process.js hola que tal
[
  'C:\\Users\\paulo\\AppData\\Local\\fnm_multishells\\14212_1726310589299\\node.exe',
  'C:\\Users\\paulo\\OneDrive\\Escritorio\\Autodidacta\\Node\\Proyectos\\curso-node\\ejercicio-1\\7.process.js',
  'hola',
  'que',
  'tal'
]
```

Forma de recuperar los argumentos permitiendo poder configurar todo. 

Terminal el proceso...
``` js
// Argumentos de entrada
console.log(process.argv)

// Controlar el proceso y su salida
//process.exit(0)

// Podemos controlar eventos del proceso
process.on('exit', () => {
    //limpar los recursos
})

// Devuelve: Current working directory (no da donde el archivo, sino desde donde se ejecuta el proceso respecto a
//      cual es donde estamos trabajando)
console.log(process.cwd())
```
Podemos también por ejemplo sacar variables de entorno...

### Mejora de la primera aplicación
Ahora vamos a mejorar la primera aplicación que habíamos hecho con todo lo que hemos dado:
Ahora le podemos pasar como argumento otra carpeta para que nos haga el ls de otra carpeta:
``` js
const fs = require('node:fs/promises')

const folder = process.argv[2] ?? '.'

fs.readdir(folder) 
	.then(files => {    
		files.forEach(file => {
				console.log(file)
		});
	})
	.catch(err => {
		if(err){
			console.err('Error al leer el directorio: ', err)
			return;
		}
	})
```

OJO con manejar los errores bien. **Evitar triggerUncaughtException**. Si no se maneja el error por ejemplo en una API, esta API se va a caer continuamente sin saber porqué. 

Algo más completo recuperando la información de cada uno de los ficheros.
``` js
const fs = require('node:fs/promises')
const path = require('node:path')

const folder = process.argv[2] ?? '.'


async function ls (directory){
	let files 
	try{
		files = await fs.readdir(folder) 
	}catch{
		console.error(`No se pudo leer el directorio ${folder}`)
		process.exit(1) // salir de forma controlada
	}

	const filesPromises = files.map(async file => {
		const filePath = path.join(folder, file)
		let stats
		try{
			stats = await fs.stat(filePath) // status - información del archivo
		}catch{
			console.error(`No se pudo leer el archivo ${filePath}`)
			process.exit(1)
		}

		const isDirectory = stats.isDirectory()
		const fileType = isDirectory ? 'd' : '-'
		const fileSize = stats.size
		const fileModified = stats.mtime.toLocaleString()

		return `${fileType} ${file} ${fileSize.toString()} ${fileModified}`

	})

	const filesInfo = await Promise.all(filesPromises)
	filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)

```

La técnica que se usa es el mapeo de todo a la vez. Esperando a todas las promesas a la vez.

### Módulo npm
Cuando se quiera descargar una dependencia en un proyecto se tiene que hacer siempre antes que nada npm init. Nos crea un package.json con información sobre dependencias, scripts, licencia, autor, versión,...

El comando de testing se puede dejar vacio por ahora.

Nos crea un package.json con toda la información. 
No se utilizan dependencias pero usaremos picocolors por ejemplo.

#### Añadir dependencia picocolors
En la página de npm buscamos picocolors y nos aparece el comando que debemos usar para su instalación:
``` shell
npm i picocolors
```

Ahora en dependencias tenemos:
``` json
"dependencies": {
    "picocolors": "^1.1.0"
  }
```

El ^ hace que se instale actualizaciones de la 1.algo. Pero le quitaremos este ^. 


Además, se ha creado una carpeta node_modules donde nos vamos a encontrar la carpeta picocolors y en esta todos los ficheros de esta nueva biblioteca.

Al descargar por ejemplo, react nos crea otras carpetas ya que cada dependencia puede tener a su vez otras dependencias, como en el caso de React. Si vamos al package.json de react vemos que tiene otras dependencias. 

Para eliminar paquetes con npm unistall y la dependencia. 

Con picocolors podemos modificar el cómo se ve el console.log / error por ejemplo para que se vea rojo:
``` js
console.error(picocolors.red(`No se pudo leer el directorio ${folder}`))
```

``` js
		return `${fileType} ${picocolors.blue(file.padEnd(20))} ${picocolors.green(fileSize.padStart(10))} ${picocolors.yellow(fileModified)}`

```

#### Tipos de dependencias
Existen las dependencias de producción como picocolors. Otro tipo e igual de importante son las dependencias de desarrollo. 
Diferencia de dependencias de desarrollo o de producción: las de desarrollo no tienen sentido instalarlo en producción por lo tanto está bien separarlo como dependencia de desarrollo.

#### linter standard
Se descarga como dependencia de desarrollo:
``` shell
npm install standard -D
```
Ahora configuramos eslint de la manera que en el package.json:
``` json
"eslintConfig":{
        "extend": "standard"
      },
```


### Primer servidor con Node.js
Para ello necesitaremos el módulo nativo para http. Esto permite poder recibir request y levantar un servidor http. 
Un servidor recibe petición o devolver una respuesta. Por lo tanto tendremos un callback con req y res:
``` js
const http = require('node:http')

const server = http.createServer((req, res) => {
	console.log('request received')
	res.end('Hola mundo')
})

server.listen(3000, () => {
	console.log('server listening on port 3000')
})
```

Puede que sea el caso de que intentemos levantar la aplicación en un puerto que ya está en uso. Para solucionarlo podemos cambiarlo y ya está, pero hay un truco para que siempre use un puerto vacío:
``` JS
server.listen(0, () => {
	console.log('server listening on port 3000')
})
```
Usando el puerto 0 que será el primer puerto que vea que está disponible.
Y cómo se sabe cual está abierto?
Se puede recuperar de la forma:

``` js
server.listen(0, () => {
	console.log(`server listening on port ${server.address().port}`)
})
```

Podemos hacer que sea clicable desde consola con:
``` js
server.listen(0, () => {
	console.log(`server listening on port http://localhost:${server.address().port}`)
})
```

Esto no es recomentable para producción obviamente. Para luego rediccionarlo al puerto 80 y tenerlo siempre disponible.

### Segunda aplicación
Nos permitirá saber que puerto está abierto/disponible.  
Lo haremos para que sea más rápido con TCP.
La idea es usar lo que anteriormente vimos para saber si un puerto está o no disponible, de esta forma. Si el código de error es el que el puerto está ocupado, es decir: EADDRINUSE, entonces intentamos resolver con el puerto 0 que es el que habíamos dicho que se usaba para encontrar el primer libre. 
De esta forma tenemos un módulo que podremos usar para intentar abrir un servidor escuchando en un puerto, si está ocupado aún así va a escuchar, pero en otro desocupado. Automáticamente.
Lo podemos hacer que vaya sumando para que lo encuentre manualmente un puerto por puerto.

``` js
const net = require('node:net')

function findAvailablePort(desiredPort){
	return new Promise((resolve, reject) => {
		const server = net.createServer()

		server.listen(desiredPort, () => {
			const { port } = server.address().port
			server.close(() => {
				resolve(port)
			})
		})

		server.on('error', (err) => {
			if(err.core === 'EADDRINUSE'){
				findAvailablePort(0).then(port => resolve(port))
			}else{
				reject(err)
			}
		})

	})
}

module.exports = { findAvailablePort }
```

Podemos ahora usarlo en el ejercicio anterior:
``` js
const http = require('node:http')
const { findAvailablePort } = require('./10.free-port')


const server = http.createServer((req, res) => {
	console.log('request received')
	res.end('Hola mundo')
})

findAvailablePort(3000).then(port => {
	server.listen(port, () => {
		console.log(`server listening on port http://localhost:${server.address().port}`)
	})
})
```



