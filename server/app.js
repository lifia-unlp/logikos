const fetch = require('node-fetch')
const jsdom = require('jsdom')

const { JSDOM } = jsdom

const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const profile_data = require('./profiles.json')
const site_templates = require('./site_templates.json')

app.use(cors())

app.get('/profiles', (req, res) => res.json(profile_data))

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

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
