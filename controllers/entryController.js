const Entry = require('../db/models/entry');

const entry_index = (req, res) => {
  // Find and return all entries
  Entry.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const entry_details = (req, res) => {
  // Look up the entry by id
  // If it doesn't exist, return 404
  Entry.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(404).send('The entry with the given ID was not found');
    });
};

const entry_create_get = (req, res) => {
  // Get our form to create a new raffle entry
};

const entry_create_post = (req, res) => {
  const entry = new Entry(req.body);

  // save new entry to the db and return the result
  entry
    .save()
    .then((result) => {
      // Redirection to another view is handled by React
      res.send(result);
    })
    .catch((err) => {
      if (err.code === 11000) {
        res
          .status(400)
          .send(
            `${req.body.name} is already registered for an entry through ${req.body.method}`
          );
      } else {
        res.status(400).send(err);
      }
    });
};

const entry_update = (req, res) => {
  // Look up the entry and update
  // If it doesn't exist, return 404
  Entry.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(404).send('The entry with given ID was not found');
    });
};

const entry_delete = (req, res) => {
  // Look up the entry
  // Not existing, return 404
  Entry.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.send(result);
      // TODO: Redirect to another view
      // res.json({ redirect: '/anotherView' })
    })
    .catch((error) => {
      res.status(404).send('The entry with given ID was not found');
    });
};

module.exports = {
  entry_index,
  entry_details,
  entry_create_get,
  entry_create_post,
  entry_update,
  entry_delete,
};
