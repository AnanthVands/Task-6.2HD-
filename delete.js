



const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('reviews.db');

// Define the SQL query to delete the third entry
const deleteQuery = `DELETE FROM reviews WHERE id = (SELECT id FROM reviews LIMIT 1 OFFSET 2)`;

// Execute the query
db.run(deleteQuery, (err) => {
  if (err) {
    console.error("Failed to delete review:", err.message);
  } else {
    console.log("Third review deleted successfully.");
  }
});

// Close the database connection
db.close();