// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


// var user = {name: 'andrew', age: 25};
// // Destructure the user object and create a new variable name.
// var {name} = user;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    // Prevent from continuing the function after the error.
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  // // Get the database reference.
  // const db = client.db('TodoApp');
  // // Create a new collection in the database.
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   complete: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // const db = client.db('TodoApp');
  // // Insert new doc into Users (name, age, location)
  // db.collection('Users').insertOne({
  //   name: 'Andrew',
  //   age: 25,
  //   location: 'Philadephia'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user', err);
  //   }
  //
  //   console.log(result.ops);
  //   console.log(result.ops[0]._id.getTimestamp());
  // });
  client.close();
});
