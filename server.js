
const express = require('express')
const bodyParser= require('body-parser')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))


const MongoClient = require('mongodb').MongoClient


MongoClient.connect('mongodb+srv://appredator:SPDspd750@cluster0.ajunnq7.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
 .then(client => {

    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    // Tell app we are using EJS
    app.set('view engine', 'ejs')

  // UPDATE HANDLER
    app.put('/quotes', (req, res) => {
      console.log(req.body)
      console.log("PUT /  Update Request is good")
    })

    // READ HANDLER
    
    app.get('/', (req, res) => {

      db.collection('quotes').find().toArray()
        .then(results => {
          return res.render('index.ejs', { quotes: results })
          
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









function randomPick()
{
let holder = Math.random();

console.log("Random value is " + holder)

if(holder < .33)
{
  console.log("Coalmont OHV")
}
else if (holder > .33 && holder < .66)
{
  console.log("Sherwood")
}
else if ( holder > .66 && holder < .999)
{
  console.log("Holly Tree, AL")
}

}

randomPick();