// const user = require('../../../database/model/user')
const user = require('../../../database/model/user')

// const createUsers = (username,password) => {
//      user.create({username,password})
// }
function createUsers (username, password){
    user.create({username,password})
}
module.exports = createUsers