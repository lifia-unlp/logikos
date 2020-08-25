const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const express = require('express')
const app = express()
const cors = require('cors')
const port = 9000

const URL = 'mongodb://127.0.0.1:27017'

app.use(cors())
app.use(express.json())

app.get('/profiles', (req, res) => {

  MongoClient.connect(URL, { useNewUrlParser: true }).then(client => {

    let db = client.db('neo-logikos')

    console.log('connected to DB')

    db.collection('profiles').find().toArray()
      .then(result => {
        console.log(result)
        res.json(result)
      })
      .catch(error => console.log(error))

    db.close()
  })

})

app.post('/profiles', (req, res) => {

  console.log("Create profile: ", req.body)

  MongoClient.connect(URL, { useNewUrlParser: true }).then(client => {

    let db = client.db('neo-logikos')

    db.collection('profiles').insertOne(req.body)
      .then(result => console.log(result))
      .catch(error => console.log(error))

    db.close()
  })
})

app.get('/profiles/:profileId', (req, res) => {

  MongoClient.connect(URL, { useNewUrlParser: true }).then(client => {

    let db = client.db('neo-logikos')

    db.collection('profiles').findOne({ _id: new ObjectId(req.params.profileId) } )
      .then(result => {
        console.log(result)
        res.json(result)
      })

    db.close()
  })
 
})

app.put('/profiles/:profileId', (req, res) => {

  MongoClient.connect(URL, { useNewUrlParser: true }).then(client => {

    let db = client.db('neo-logikos')

    delete req.body._id

    db.collection('profiles').findOneAndUpdate({ _id: new ObjectId(req.params.profileId) }, { $set: req.body })
      .then(result => {
        console.log(result)
        res.json(result)
      })
      .catch(error => console.log(error))

    db.close()
  })

})

app.delete('/profiles/:profileId', (req, res) => {

  MongoClient.connect(URL, { useNewUrlParser: true }).then(client => {

    let db = client.db('neo-logikos')

    db.collection('profiles').deleteOne({ _id: new ObjectId(req.params.profileId) })
      .then(result => {
        console.log(result)
        res.json(result)
      })
      .catch(error => console.log(error))

    db.close()
  })

})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
