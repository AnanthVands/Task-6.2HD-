const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Set up middleware
app.use(express.static('public_html'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to SQLite database
const db = new sqlite3.Database('books.db');
const db1 = new sqlite3.Database('order_info.db');
const db2 = new sqlite3.Database('reviews.db');

// Route to render the index page
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/categories', (req, res) => {
  res.render('categories');
});

app.get('/classics', (req, res) => {
  res.render('classics');
});

app.get('/fantasy', (req, res) => {
  res.render('fantasy');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/faq', (req, res) => {
  res.render('faq');
});

app.get('/list', (req, res) => {
  db.all('SELECT * FROM books', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Database error");
      return;
    }
    res.render('list', { books: rows });
  });
});

app.get('/offers', (req, res) => {
  res.render('offers');
});

app.get('/order', (req, res) => {
  res.render('order');
});


app.get('/philosophy', (req, res) => {
  res.render('philosophy');
});

app.get('/popular', (req, res) => {
  res.render('popular');
});

app.get('/reviews', (req, res) => {
  db2.all('SELECT * FROM reviews', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Database error");
      return;
    }
    res.render('reviews', { reviews: rows });
  });
});

app.get('/scifi', (req, res) => {
  res.render('scifi');
});

app.post('/search', (req, res) => {
  const { booksearch } = req.body;
  const searchTermWithWildcards = `%${booksearch}%`;
  const query = 'SELECT * FROM books WHERE title LIKE ? OR author LIKE ?';

  db.all(query, [searchTermWithWildcards, searchTermWithWildcards], (err, rows) => {
    if (err) {
      res.status(500).send("Database error");
      return;
    }
    res.render('search_results', { searchTerm: booksearch, books: rows });
  });
});

app.post('/submitOrder', (req, res) => {
  const { email, password, mobile, firstname, surname, dateofbirth, address, city, state, postcode, query } = req.body;
  db1.run('INSERT INTO orders (email, password, mobile, firstname, surname, dateofbirth, address, city, state, postcode, query) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [email, password, mobile, firstname, surname, dateofbirth, address, city, state, postcode, query], () => {
      res.render('Confirmation', { title: 'Order Confirmation', email, mobile, firstname, surname, address, city, state});
  });
});

app.post('/submitReview', (req, res) => {
  const { name, bookTitle, authorName, rating, reviewContent } = req.body;
  db2.run('INSERT INTO reviews (name, bookTitle, authorName, rating, reviewContent) VALUES (?, ?, ?, ?, ?)', [name, bookTitle, authorName, rating, reviewContent], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Database error");
      return;
    }
    console.log("Review inserted successfully");
    // After inserting the review, retrieve all reviews and render the reviews page
    db2.all('SELECT * FROM reviews', (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Database error");
        return;
      }
      res.render('reviews', { reviews: rows });
    });
  });
});




app.listen(port, () => {
  console.log(`Web server running at: http://localhost:${port}`);
  console.log(`Type Ctrl+C to shut down the web server`);
});
