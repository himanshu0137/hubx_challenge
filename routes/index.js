const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Event = require('../models/Event');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  Event.find({}, (err, events) => {
    res.render('dashboard', {
      user: req.user,
      events: events
    });
  });
});

router.get('/create', ensureAuthenticated, (req, res) => {
  res.render('create');
});
router.post('/create', ensureAuthenticated, (req, res) => {
  const eventDetails = req.body;

  const newEvent = new Event({
    name: eventDetails.name,
    place: eventDetails.place,
    startTime: eventDetails.startTime,
    createdBy: req.user.name,
    endTime: eventDetails.endTime,
    isAllDay: eventDetails.allDay === 'on',
    date: eventDetails.date
  });

  newEvent.save().then(event => {
    req.flash(
      'success_msg',
      'Event is Created'
    );
    res.redirect('/dashboard');
  });
});

module.exports = router;
