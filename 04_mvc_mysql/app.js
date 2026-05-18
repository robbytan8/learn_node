require('dotenv').config()
const express = require('express');
const methodOverride = require('method-override')
const app = express();
const route = require('./routes/route');

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(route)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
})
