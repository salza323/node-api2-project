const express = require('express');
const Hubs = require('./db');

const router = express.Router();

router.post('./api/posts', (req, res) => {
  Hubs.insert(req.body)
    .then((data) => {
      if (!req.body) {
        res.status(400).json({
          errorMessage: 'Please provide title and contents for the post.',
        });
      } else {
        res.status(201).json(data);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        errorMessage: 'Please provide title and contents for the post.',
      });
    });
});

router.get('/api/posts', (req, res) => {
  console.log(req.query);
  Hubs.find(req.query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error retrieving the hubs',
      });
    });
});

router.get('api.posts/:id', (req, res) => {
  console.log(req.params.id);
  Hubs.findById(req.params.id).then((data) => {
    if (data.length) {
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({
          message: 'Hub not found',
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            message: 'Wrong',
          });
        });
    }
  });
});

router.get('api/posts/:id/comments', (req, res) => {
  console.log(req.params.id);
  Hubs.findPostComments(req.params.id)
    .then((data) => {
      if (data.length) {
        const thisComment = data.map((comment) => {
          return comment.text;
        });
        res.status(200).json(thisComment);
      } else {
        res.status(404).json({ message: 'Hub not found.' });
      }
    })
    .catch((error) => {
      console.log(errror);
      res.status(500).json({
        message: 'Wrong',
      });
    });
});

router.post('/api.posts/:id/comments', (req, res) => {
  console.log(req.params.id, req.body);
  const newComment = { post_id: req.params.id, ...req.body };
  Hubs.insertComment(newComment)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => {
      console.log(error.message, error.stack);
      res.status(500).json({
        message: error.message,
        stack: error.stack,
      });
    });
});

router.delete('/api/posts/:id', (req, res) => {
  Hubs.remove(req.params.id)
    .then((data) => {
      if (data.length) {
        console.log(data);
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: 'Not to delete found' });
      }
    })
    .catch((error) => {
      console.log(error.message, error.stack);
      res.status(500).json({
        message: error.message,
        stack: error.stack,
      });
    });
});

router.put('/api/posts/:id', (req, res) => {
  Hubs.update(req.params.id, req.body)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
        console.log(data);
      } else {
        res.status(404).json({ message: 'Not to update found' });
      }
    })
    .catch((error) => {
      console.log(error.message, error.stack);
      res.status(500).json({
        message: error.message,
        stack: error.stack,
      });
    });
});

module.exports = router;
