var bcrypt = require('bcryptjs')

const pass = '12345678'

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(pass, salt)

console.log(pass, hash)

console.log(bcrypt.compareSync(pass, hash))
// if(hash = secHash){
//     console.log('matched')
// }
// else{
//     console.log('not matched')
// }