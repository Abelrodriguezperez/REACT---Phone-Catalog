CREATE TABLE IF NOT EXISTS phones(
    id INTEGER PRIMARY KEY,
    phoneName TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    description TEXT NOT NULL,
    color TEXT NOT NULL,
    price INTEGER NOT NULL,
    imageFileName TEXT NOT NULL,
    screen TEXT NOT NULL,
    processor TEXT NOT NULL,
    ram INTEGER NOT NULL
)