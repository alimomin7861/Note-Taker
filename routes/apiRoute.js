const router = require('express').Router();

const fs = require('fs');
const util = require('util');

const writeFileFunc = util.promisify(fs.writeFile)

const obj = {
    title: "Harry Porter",
    text: "Awesome book"
}

// GET /api/notes should read the db.json file and return all saved notes as JSON.


// fs.writeFile('./db/data.json', JSON.stringify(obj), (err) => console.log(err))

router.post('/notes', (req, res) => {
    const data = req.body;
    writeFileFunc('./db/rdb.json', JSON.stringify(data))
    .then(response => res.json(response));
})

module.exports = router;