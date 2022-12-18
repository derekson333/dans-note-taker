const express = require('express');
const apiroutes = require('./routes/apiroutes')
const homeroutes = require('./routes/homeroutes')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(apiroutes)
app.use(homeroutes)

// listener code
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });
  