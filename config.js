exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/mood-boost-api';
                      exports.TEST_DATABASE_URL = (
                      	process.env.TEST_DATABASE_URL ||
                      	'mongodb://localhost/test-mood-boost-api');
exports.PORT = process.env.PORT || 8080;

// module.exports = {
//     API_BASE_URL: process.env.REACT_APP_API_BASE_URL ||
//     "http://localhost:3000/api"
// };