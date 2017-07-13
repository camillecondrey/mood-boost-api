const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jsonParser = require('body-parser').json();

const {DATABASE_URL, PORT} = require('./config');
const {userRouter} = require('./userRouter');
const {moodRouter} = require('./moodRouter');
const {User, Moods} = require('./models');


//enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(express.static('public'));
exports.app = app;

app.use('/users', userRouter);
app.use('/tracker', moodRouter);



function runServer() {
    console.log(DATABASE_URL);
    return new Promise((resolve, reject) => {
        mongoose.connect(DATABASE_URL, err => {
            if (err) {
                return reject(err);
            }

            server = app.listen(PORT, () => {
                console.log(`Your app is listening on port ${PORT}`);
                resolve();
            })
            .on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

module.exports = {app, runServer, closeServer};






