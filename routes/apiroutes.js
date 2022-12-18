let notes = require('../db/db.json');
const uniqid = require('uniqid');
const fs = require('fs');
const path = require('path');
const router = require('express').Router()


    router.get('/api/notes', (req, res) => {
        res.json(notes)
    });

    // post request to db.json file
    router.post('/api/notes', (req, res) => {
        const note = req.body
        console.log(note);
        let newNote = {
            title: note.title,
            text: note.text,
            id: uniqid()
        };
        notes.push(newNote)
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), (err, data) => {
            if (err) throw err;
            return res.json(notes);
        });
    });


    // deletes note with id
    router.delete('/api/notes/:id', (req, res) => {

        let noteId = req.params.id
        console.log(noteId);

        for (let i = 0; i < notes.length; i++) {
            if(noteId === notes[i].id) {
                notes.splice(i, 1);
                fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), (err, data) => {
                    if (err) throw err;
                    return notes;
                });
            }
        }
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    module.exports = router