'use strict';

const app = require('./app');

const PORT = process.env.PORT || 2020;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
