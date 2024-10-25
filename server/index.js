
import { mysqlPassword,mysqlUser } from './env.js';
import express from 'express';
import cors from 'cors';
import oracledb from 'oracledb';

const app = express();
// const crimeData = require('./data.json');


oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;




  
app.use(cors())




app.get('/', async (req, res) => {
    let connection;
    try {
        // Establish connection
        connection = await oracledb.getConnection({
            user: mysqlUser,
            password: mysqlPassword,
            connectString: "oracle.cise.ufl.edu/orcl"
        });

        // Execute the SELECT statement
        const result = await connection.execute(
            `SELECT * FROM CF_Crime ORDER BY VictAge ASC FETCH FIRST 5 ROWS ONLY`
        );

        // Send the query result rows as a response
        res.json(result.rows);  // `rows` contains the query results as an array of objects

    } catch (error) {
        console.error("Error executing query:", error);
        res.status(500).send("Error executing query");
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Error closing connection:", err);
            }
        }
    }
//     const createTableExample = await connection.execute(
//     `CREATE TABLE Persons (
//     PersonID int,
//     LastName varchar(255),
//     FirstName varchar(255),
//     Address varchar(255),
//     City varchar(255)
//     )`
//     );

    // const insertExample = await connection.execute(
    //     `
    //     INSERT INTO Persons (PersonID, LastName, FirstName, Address, City)
    //     VALUES (1, 'Erichsen', 'Stavanger', '555 sea lane', 'Norway')`
    //     );

    // console.log(insertExample);


    // const selectExample = await connection.execute(
    //     `SELECT * FROM CF_Crime ORDER BY VictAge ASC FETCH FIRST 5 ROWS ONLY;`
    //     );

    // await connection.close();

    // res.send("Put return data var here")
})

app.listen(8080, () => {
      console.log('server listening on port 8080')
})
