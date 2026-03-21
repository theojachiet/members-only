const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   username VARCHAR(255),
   password VARCHAR(255),
   is_admin BOOLEAN
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER,
    text VARCHAR(255),
    date TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: `postgresql://${process.env.DB_LOGIN}:${process.env.DB_PWD}@localhost:5432/${process.env.DB_NAME}`
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();