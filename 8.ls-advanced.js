/*
const fs = require('node:fs')
const folder = process.argv[2] ?? '.'

fs.readdir(folder, (err, files) => {
    if(err){
        console.err('Error al leer el directorio: ', err)
        return;
    }

    files.forEach(file => {
        console.log(file)
    })
})
*/
// Utilizando promises
const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.error(pc.red(`No se pudo leer el directorio ${folder}`))
    process.exit(1)
  }
  const filePromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await fs.stat(filePath) // status - informacion del archivo
    } catch {
      console.error(pc.red(`No se pudo leer el archivo ${filePath}`))
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleString()

    return `${pc.magenta(fileType)} ${pc.blue(file.padEnd(20))} ${pc.green(
      fileSize.toString().padStart(10)
    )} ${pc.yellow(fileModified)}`
  })

  const fileInfo = await Promise.all(filePromises)
  fileInfo.forEach((fileInfo) => console.log(fileInfo))
}

ls(folder)
