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



