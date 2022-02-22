const fs = require('fs');
const path = require('path');

module.exports.user = fs.readFileSync(path.join(__dirname, 'user.gql'), 'utf8');
module.exports.users = fs.readFileSync(path.join(__dirname, 'users.gql'), 'utf8');
module.exports.whoAmI = fs.readFileSync(path.join(__dirname, 'whoAmI.gql'), 'utf8');
module.exports.project = fs.readFileSync(path.join(__dirname, 'project.gql'), 'utf8');
module.exports.projects = fs.readFileSync(path.join(__dirname, 'projects.gql'), 'utf8');
module.exports.projectsLov = fs.readFileSync(path.join(__dirname, 'projectsLov.gql'), 'utf8');
module.exports.art = fs.readFileSync(path.join(__dirname, 'art.gql'), 'utf8');
module.exports.arts = fs.readFileSync(path.join(__dirname, 'arts.gql'), 'utf8');
module.exports.attribute = fs.readFileSync(path.join(__dirname, 'attribute.gql'), 'utf8');
module.exports.attributes = fs.readFileSync(path.join(__dirname, 'attributes.gql'), 'utf8');
module.exports.factories = fs.readFileSync(path.join(__dirname, 'factories.gql'), 'utf8');
module.exports.factory = fs.readFileSync(path.join(__dirname, 'factory.gql'), 'utf8');
module.exports.customers = fs.readFileSync(path.join(__dirname, 'customers.gql'), 'utf8');
module.exports.customer = fs.readFileSync(path.join(__dirname, 'customer.gql'), 'utf8');
