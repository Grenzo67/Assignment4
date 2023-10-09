const knexConfig = require('./Knexfile')[process.env.NODE_ENV || 'development'];

const knex = require('knex')(knexConfig);
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/public/createEnigme.js', (req, res) => {
  const options = {
    root: __dirname + '/public',
    headers: {
      'Content-Type': 'text/javascript'
    }
  };

  res.sendFile('createEnigme.js', options, (err) => {
    if (err) {
      console.error(err);
      res.status(500).end();
    }
  });
});

app.get('/public/readEnigmes.js', (req, res) => {
  const options = {
    root: __dirname + '/public',
    headers: {
      'Content-Type': 'text/javascript'
    }
  };

  res.sendFile('readEnigmes.js', options, (err) => {
    if (err) {
      console.error(err);
      res.status(500).end();
    }
  });
});

app.get('/public/updateEnigme.js', (req, res) => {
  const options = {
    root: __dirname + '/public',
    headers: {
      'Content-Type': 'text/javascript'
    }
  };

  res.sendFile('updateEnigme.js', options, (err) => {
    if (err) {
      console.error(err);
      res.status(500).end();
    }
  });
});

app.get('/public/deleteEnigme.js', (req, res) => {
  const options = {
    root: __dirname + '/public',
    headers: {
      'Content-Type': 'text/javascript'
    }
  };

  res.sendFile('deleteEnigme.js', options, (err) => {
    if (err) {
      console.error(err);
      res.status(500).end();
    }
  });
});


app.get('/api/riddles/random', async (req, res) => {
  try {
    const [randomEnigme] = await knex('riddles')
      .select('*')
      .orderByRaw('RANDOM()')
      .limit(1);

    if (!randomEnigme) {
      res.status(404).json({ error: 'No enigmes found' });
      return;
    }

    res.status(200).json(randomEnigme);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/riddles', async (req, res) => {
  try {
    const { question, answer } = req.body;
    
    if (!question || !answer) {
      res.status(400).json({ error: 'Question and answer are required' });
      return;
    }
    
    knex('riddles')
      .insert({ question, answer })
      .then(() => {
        res.json({ success: true });
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/api/riddles/:id', async (req, res) => {
  try {
    const { question, answer } = req.body;
    const { id } = req.params;

    if (!question || !answer) {
      res.status(400).json({ error: 'Question and answer are required' });
      return;
    }

    const [updatedEnigme] = await knex('riddles')
      .where({ id })
      .update({ question, answer })
      .returning(['id', 'question', 'answer']);

    if (!updatedEnigme) {
      res.status(404).json({ error: 'Enigme not found' });
      return;
    }

    res.status(200).json(updatedEnigme);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/riddles/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [deletedEnigme] = await knex('riddles')
      .where({ id })
      .del()
      .returning(['id', 'question', 'answer']);

    if (!deletedEnigme) {
      res.status(404).json({ error: 'Enigme not found' });
      return;
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
