const router = require('express').Router();
const fs = require('fs');

// npm module that generates unique ID's for notes
const uuid = require('uuid');

// Route to retrieve all notes
router.get('/api/notes', async (req, res) => {
    try {
        const dbJSON = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
        res.json(dbJSON);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to add a new note
router.post('/api/notes', (req, res) => {
    try {
        // Read the existing content of the file
        const fileContent = fs.readFileSync('db/db.json', 'utf-8');
        
        // Parse the existing content as JSON
        const dbJson = JSON.parse(fileContent);

        const newNote = {
            id: uuid.v4(),
            title: req.body.title,
            text: req.body.text
        };

        // add the new note to the existing notes container
        dbJson.push(newNote);

        // Write the updated JSON back to the file
        fs.writeFileSync('db/db.json', JSON.stringify(dbJson));

        res.json(dbJson);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

// Route to delete a note
router.delete('/api/notes/:id', (req, res) => {
    let noteData = fs.readFileSync('db/db.json', 'utf-8');
    const dataJson = JSON.parse(noteData);
    const noteToDelete = dataJson.filter((note) => {
        return note.id !== req.params.id;
    });
    fs.writeFileSync('db/db.json', JSON.stringify(noteToDelete));
    res.json('Note successfully deleted');
});

module.exports = router;