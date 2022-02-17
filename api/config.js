const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    mongo: {
        db: 'mongodb://localhost/link-shorter',
        options: {useNewUrlParser: true},
    }
}
