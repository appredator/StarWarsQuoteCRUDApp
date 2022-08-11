
const express = require('express')
const bodyParser= require('body-parser')
const app = express()

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))


const MongoClient = require('mongodb').MongoClient


MongoClient.connect('mongodb+srv://appredator:SPDspd750@cluster0.ajunnq7.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
 .then(client => {

    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    // Tell app we are using EJS
    app.set('view engine', 'ejs')

    // app.use(/* ... */)

    // READ HANDLER
    
    app.get('/', (req, res) => {
      // return res.sendFile(__dirname + '/index.html')
      db.collection('quotes').find().toArray()
        .then(results => {
          return res.render('index.ejs', { quotes: results })
          return;
        })
        .catch(error => console.error(error))
    })


    //CREATE HANDLER

    app.post('/quotes', (req, res) => {

        quotesCollection.insertOne(req.body)
          .then(result => {
            console.log(result)
            return res.redirect('/')
            
          })
          .catch(error => console.error(error))
      })

    app.listen(3000, function() {

   
    console.log('listening on 3000')
    })


})
.catch(console.error)






// All your handlers here...
//app.get('/', (req, res) => {/*...*/})
//app.post('/quotes', (req, res) => {/*...*/})





  // // ES6 code from here forward
  // app.get('/', (req, res) => {
  //   return res.sendFile(__dirname + '/index.html')
  //   // Note: __dirname is the current directory you're in. 
  //   //Try logging it and see what you get!
  // })


