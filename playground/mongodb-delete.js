const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete the documents', err);
  // });
  // deleteOne, delete the first element which satisfies the filter.
  // db.collection('Todos').deleteOne({text: 'Walk the dog'}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete the document', err);
  // });
  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete the document', err);
  // });

  // db.collection('Users').deleteMany({name: 'Andrew'});

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5b7b6c945dc1a244c0179374')
  }).then((results) => {
    console.log(JSON.stringify(results, undefined, 2));
  }, (err) => {
    console.log('Unable to delete', err);
  });
  client.close();
})
