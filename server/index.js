
import { mysqlPassword,mysqlUser } from './env.js';
import express from 'express';
import cors from 'cors';
import oracledb from 'oracledb';

const app = express();


oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;





  
app.use(cors())

app.get('/', async (req, res) => {
    const connection = await oracledb.getConnection ({
        user          : mysqlUser,
        password      : mysqlPassword,
        connectString : "oracle.cise.ufl.edu/orcl"
    });


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


    // const selectExample = await connection.execute(
    //     `
    //     SELECT * FROM Persons`
    //     );


    res.send("Results")
})

app.listen(8080, () => {
      console.log('server listening on port 8080')
})
