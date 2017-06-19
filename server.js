// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const morgan = require('morgan');
// const jsonParser = require('body-parser').json();

// const {DATABASE_URL, PORT} = require('./config');
// const {userRouter} = require('./userRouter');
// const {moodRouter} = require('./moodRouter');
// const {User, Moods} = require('./models');

// app.use(express.status('public'));
// exports.app = app;

// app.use('/users', userRouter);
// app.use('/tracker', moodRouter);

// function runServer() {
//     return new Promise((resolve, reject) => {
//         mongoose.connect(DATABASE_URL, err => {
//             if (err) {
//                 return reject(err);
//             }

//             server = app.listen(PORT, () => {
//                 console.log(`Your app is listening on port ${PORT}`);
//                 resolve();
//             })
//             .on('error', err => {
//                 mongoose.disconnect();
//                 reject(err);
//             });
//         });
//     });
// }

// function closeServer() {
//   return mongoose.disconnect().then(() => {
//      return new Promise((resolve, reject) => {
//        console.log('Closing server');
//        server.close(err => {
//            if (err) {
//                return reject(err);
//            }
//            resolve();
//        });
//      });
//   });
// }

// if (require.main === module) {
//   runServer().catch(err => console.error(err));
// };

// module.exports = {app, runServer, closeServer};






const express = require('express');
 const app = express();

 const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 app.get('/api/*', (req, res) => {
   res.json({ok: true});
 });

 app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

 module.exports = {app};