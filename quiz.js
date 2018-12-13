const array = [ 104, 116, 116, 112, 115, 58, 47, 47, 101, 110, 103, 105, 110, 101, 101, 114, 105, 110, 103, 45, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 46, 98, 114, 105, 116, 101, 99, 111, 114, 101, 46, 99, 111, 109, 47, 113, 117, 105, 122, 47, 115, 97, 97, 115, 100, 97, 115, 100, 108, 102, 108, 102, 108, 115 ]

const string = array.map(a => {
  return String.fromCharCode(a)
}).join('')

console.log(string)

let Fernet = require('fernet')
let secret = new Fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
// Oh no! The code is going over the edge! What are you going to do?
let message = 'gAAAAABcEXjGEzsNNAPqdB8K2XyRYhe-kk3-KFB23GaMALKU1vyjxM2WdzOwkoJAM_oTl8JQxMliNIyDG8UirwpxmrZ1OtINxTjgUOa3kTyMekbvHGUR3kIbh6gTVXaOXMovBfoiLXYghsZNUZDaC07s4jVlc8rIwtzyQaXVi1xblA8OihSVx_8yFy6ataWJNLrROBMh7h_U'
let token = new Fernet.Token({secret, token: message, ttl:0})
token.decode()

console.log(token.decode())
