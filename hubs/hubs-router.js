const express = require('express');
const Hubs = require('./hubs-model');

const router = express.Router();

router.post('./api/posts', (req, res) => {
  Hubs.insert(req.body)
    .then((hub) => {
      if (!req.body) {
        res.status(400).json({
          errorMessage: 'Please provide title and contents for the post.',
        });
      } else {
        res.status(201).json(hub);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        errorMessage: 'Please provide title and contents for the post.',
      });
    });
});

module.exports = router;
