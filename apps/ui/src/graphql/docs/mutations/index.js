const fs = require('fs');
const path = require('path');

module.exports.createUser = fs.readFileSync(path.join(__dirname, 'createUser.gql'), 'utf8');
module.exports.updateUser = fs.readFileSync(path.join(__dirname, 'updateUser.gql'), 'utf8');
module.exports.login = fs.readFileSync(path.join(__dirname, 'login.gql'), 'utf8');
module.exports.logout = fs.readFileSync(path.join(__dirname, 'logout.gql'), 'utf8');
module.exports.changePassword = fs.readFileSync(path.join(__dirname, 'changePassword.gql'), 'utf8');
module.exports.createProject = fs.readFileSync(path.join(__dirname, 'createProject.gql'), 'utf8');
module.exports.updateProject = fs.readFileSync(path.join(__dirname, 'updateProject.gql'), 'utf8');
module.exports.createArt = fs.readFileSync(path.join(__dirname, 'createArt.gql'), 'utf8');
module.exports.updateArt = fs.readFileSync(path.join(__dirname, 'updateArt.gql'), 'utf8');
module.exports.createFactory = fs.readFileSync(path.join(__dirname, 'createFactory.gql'), 'utf8');
module.exports.updateFactory = fs.readFileSync(path.join(__dirname, 'updateFactory.gql'), 'utf8');
module.exports.createCustomer = fs.readFileSync(path.join(__dirname, 'createCustomer.gql'), 'utf8');
module.exports.updateCustomer = fs.readFileSync(path.join(__dirname, 'updateCustomer.gql'), 'utf8');
module.exports.createAttribute = fs.readFileSync(path.join(__dirname, 'createAttribute.gql'), 'utf8');
module.exports.updateAttribute = fs.readFileSync(path.join(__dirname, 'updateAttribute.gql'), 'utf8');
module.exports.updateAttributesOrder = fs.readFileSync(path.join(__dirname, 'updateAttributesOrder.gql'), 'utf8');

