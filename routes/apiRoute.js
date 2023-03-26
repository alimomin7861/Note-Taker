const router = require('express').Router();
const fs = require('fs');
const util = require('util');
const uuid = require('uuid');

const writeFileFunc = util.promisify(fs.writeFile)

// const obj = {
//     title: "Harry Porter",
//     text: "Awesome book"
// }



// fs.writeFile('./db/data.json', JSON.stringify(obj), (err) => console.log(err))



// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/notes', (req,res) => {
    // Read the db.json file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        // Parse the JSON data into an array of notes
        const notes = JSON.parse(data);
        // Send the notes array as a JSON response
        res.json(notes);
  });
});



// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
router.post('/notes', (req, res) => {
    // Extract the new note object from the request body
    const newNote = req.body;
    // Generate a unique id for the new note
    newNote.id = uuid.v4();
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        // Parse the JSON data into an array of notes
        const notes = JSON.parse(data);
        // Add the new note to the array
        notes.push(newNote);

        writeFileFunc('./db/db.json', JSON.stringify(notes), err => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
        });
        // .then(response => res.json(response));

        // Send the new note object as a JSON response
        res.json(newNote);
    });
    
});

module.exports = router;