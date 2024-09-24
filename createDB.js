const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('books.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        ISBN TEXT NOT NULL
    )`);

    const insertData = db.prepare('INSERT INTO books (title, author, ISBN) VALUES (?, ?, ?)');
    insertData.run('House of Leaves', 'Mark Danielewski', '2002');
    insertData.run('Shogun', 'James Clavell', '8122');
    insertData.run('To Kill a Mockingbird', 'Harper Lee', '5472');
    insertData.run('Brave New World', 'Aldous Huxley', '1153');
    insertData.run('Blood Meridian; or The Evening Redness in the West', 'Cormac McCarthy', '4385');
    insertData.run('The Iliad', 'Homer', '1507');
    insertData.run('The Brothers Karamazov', 'Fyodor Dostoevsky', '7083');
    insertData.run('The Old Man and the Sea', 'Ernest Hemingway', '6396');
    insertData.run('1984', 'George Orwell', '6592');
    insertData.run('The Count of Monte Cristo', 'Alexandre Dumas', '2213');
    insertData.run('Rebecca', 'Daphne Du Maurier', '4990');
    insertData.run('Ham on Rye', 'Charles Bukowski', '9001');
    insertData.run('Beloved', 'Toni Morrison', '8021');
    insertData.run("Giovanni's Room", ' James Baldwin', '0873');
    insertData.run('2666', 'Roberto Bolano', '4205');
    insertData.run('The Lord of the Rings', 'J.R.R. Tolkien', '1234');
    insertData.run('The Metamorphosis', 'Franz Kafka', '6592');
    insertData.run('Notes from Underground', 'Fyodor Dostoevsky', '8372');
    insertData.run('White Nights', 'Fyodor Dostoevsky', '9312');
    insertData.run('Stories of Your Life', 'Ted Chiang', '2097');
    insertData.run('The Catcher in the Rye', 'J.D. Salinger', '2345');
    insertData.run('The Stranger', 'Albert Camus', '5206');
    insertData.run('The Great Gatsby', 'F. Scott Fitzgerald', '0982');
    insertData.run('Station Eleven', 'Emily St. John Mandel', '5491');
    insertData.run('Fear and Loathing in Las Vegas', 'Hunter S. Thompson', '9671');
    insertData.run('The Stranger', 'Albert Camus', '8206');
    insertData.run('Dune', 'Frank Herbert', '6071');
    insertData.run('The Road', 'Cormac McCarthy', '2391');
    insertData.run('A Gentleman in Moscow', 'Amor Towles', '8021');
    insertData.run('The Doors of Perception', 'Aldous Huxley', '5206');

    insertData.finalize();

    db.each('SELECT * FROM books', (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(row);
    });
});

const db1 = new sqlite3.Database('order_info.db');

db1.serialize(() => {
    db1.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        mobile TEXT NOT NULL,
        firstname TEXT NOT NULL,
        surname TEXT NOT NULL,
        dateofbirth TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        postcode TEXT NOT NULL,
        query TEXT
    )`);
});

db1.close();

const db2 = new sqlite3.Database('reviews.db');

db2.serialize(() => {
    db2.run(`CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        bookTitle TEXT,
        authorName TEXT,
        rating INTEGER,
        reviewContent TEXT
    )`);
});

db2.close();


