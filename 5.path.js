const path = require('node:path')

//saber que tipo de separacion en el path depende del OS
console.log(path.sep)

//unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

//obtener nombre del fichero con extension
const base = path.basename('tmp/ferespira-secret-file/password.txt')
console.log(base)

//obtener nombre del fichero sin extension
const filename = path.basename('tmp/ferespira-secret-file/password.txt', '.txt')
console.log(filename)

//obtener la extension del fichero
const extension = path.extname('tmp/ferespira-secret-file/password.txt')
console.log(extension)
