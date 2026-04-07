//  Print text to console
console.log(`Hello Node.JS`)
const author = 'Robby Tan'
console.log(`Hello ${author}`)

//  Write text to file
//  File saved in public (hello.txt)
const fs = require('fs')
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis augue sed pulvinar interdum. Curabitur feugiat metus eget ornare consequat. In rhoncus consectetur convallis. Phasellus ac placerat sapien. Duis viverra non mi ut efficitur. Aliquam ut diam leo. Aliquam rutrum risus non lacus ultrices aliquet. Fusce tincidunt sagittis augue ac egestas. Duis sit amet porttitor elit. Fusce eget sagittis neque. Cras ut nunc et tellus congue tristique. Donec elementum ex ac quam posuere fringilla. Interdum et malesuada fames ac ante ipsum primis in faucibus.";
fs.mkdirSync('public')
fs.writeFileSync('public/hello.txt', text)

