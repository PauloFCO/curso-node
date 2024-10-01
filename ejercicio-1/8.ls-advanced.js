const fs = require('node:fs/promises')
const path = require('node:path')
const picocolors = require('picocolors')

const folder = process.argv[2] ?? '.'


async function ls (directory){
	let files 
	try{
		files = await fs.readdir(folder) 
	}catch{
		console.error(picocolors.red(`No se pudo leer el directorio ${folder}`))
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
		const fileType = isDirectory ? 'd' : 'f'
		const fileSize = stats.size.toString()
		const fileModified = stats.mtime.toLocaleString()

		return `${picocolors.bgMagentaBright(fileType)} ${picocolors.blue(file.padEnd(20))} ${picocolors.green(fileSize.padStart(10))} ${picocolors.yellow(fileModified)}`

	})

	const filesInfo = await Promise.all(filesPromises)
	filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)
