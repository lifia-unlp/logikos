const fetch = require('node-fetch')
const jsdom = require('jsdom')

const { JSDOM } = jsdom

const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 9000

const MONGODB_URL = process.env.MONGO_URL
let db;

const site_templates = require('./site_templates.json')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('Neo Logikos'))

app.get('/profiles', (req, res) => {

  console.log(db)

  db.collection('profiles').find().toArray()
    .then(result => {
      console.log(result)
      res.json(result)
    })
    .catch(error => console.log(error))
})

app.post('/profiles', (req, res) => {

  console.log("Create profile: ", req.body)

  db.collection('profiles').insertOne(req.body)
    .then(cmdResult => console.log(cmdResult, cmdResult.insertedCount, cmdResult.ops))
    .catch(error => console.log(error))
})

app.get('/profiles/:profileId', (req, res) => {

  db.collection('profiles').findOne({ _id: new ObjectId(req.params.profileId) })
    .then(result => {
      console.log(result)
      res.json(result)
    })
})

app.put('/profiles/:profileId', (req, res) => {

  delete req.body._id

  db.collection('profiles').findOneAndUpdate({ _id: new ObjectId(req.params.profileId) }, { $set: req.body })
    .then(cmdResult => {
      console.log(cmdResult)
      res.json(cmdResult)
    })
    .catch(error => console.log(error))

})

app.delete('/profiles/:profileId', (req, res) => {

  db.collection('profiles').deleteOne({ _id: new ObjectId(req.params.profileId) })
    .then(result => {
      console.log(result)
      res.json(result)
    })
    .catch(error => console.log(error))

})

app.get('/alternative', (req, res) => {
  const url = new URL(req.query.url)

  fetch(req.query.url)
    .then((r) => r.text())
    .then((t) => {
      const template = site_templates.find(t => t.url === url.hostname)

      if (template !== undefined) {
        const dom = new JSDOM(t)

        const alternative = { url: req.query.url }

        for (const pattern of template.patterns) {
          const xr = dom.window.document.evaluate(pattern.xpath, dom.window.document, null, dom.window.XPathResult.STRING_TYPE, null)

          alternative[pattern.attribute] = xr.stringValue

          if ("parsers" in pattern) {
            for (const parser of pattern.parsers) {
              switch (parser) {
                case "NumberParser":
                  alternative[pattern.attribute] = parseFloat(xr.stringValue.match(/(\d+)/)[0])
                break;
                case "MoneyParser":
                  alternative[pattern.attribute] = parseFloat(xr.stringValue.match(/(\d+)/)[0]) * 80
                break;
              }
            }
          }
        }

        console.log(alternative)

        res.json(alternative)
      }
      else {
        res.json({ error: "URL cannot be parsed" })
      }

    })

})


MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(database => {

  db = database.db('neo-logikos');

  app.listen(port, () => console.log(`Neo Logikos server listening at port ${port}`))
})

