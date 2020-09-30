const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../modules/Gig');

//only / required as it has already been pointed to this file
router.get('/', (req, res) =>   {    //to get list
    Gig.findAll()       //findAll returns a promise
    .then(gigs => {
        console.log(gigs);
        res.sendStatus(200);    //to make sure its not hanging
    })
    .catch(err => console.log(err))
    });

//Adding a gig
router.post('/add', (req, res) => {
    console.log('ay',req.body)
    const data = {
        title: req.body.title,
        technologies: req.body.technologies,
        budget: req.body.budget,
        description: req.body.description,
        email_address: req.body.email_address,
    }

    let { title, technologies, budget, description, contact_email } = data;     //data to pull out

    //To insert to database table
    Gig.create({
        title,                  //need not assign variables since the names are the same
        technologies,
        budget,
        description,
        contact_email
    })
    .then(gig => res.send(data))
    .catch(err => console.log(err));
});

router.put('/update', (req, res) => {
    Gig.update({ budget: '10000' }, {
        where: {
          budget: 30
        }
      })
    .then(gig => res.send('budget updated'))
    .catch(err => console.log(err));
})

router.delete('/delete', (req, res) => {
    Gig.destroy({
        where: {
          id: 5
        }
    })
    .then(gig => res.send('User Data Deleted'))
    .catch(err => console.log(err));
})

module.exports = router;