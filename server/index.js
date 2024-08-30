
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



    const result1 = await connection.execute(
        `
        INSERT INTO Persons (PersonID, LastName, FirstName, Address, City)
VALUES (1, 'Erichsen', 'Stavanger', '555 sea lane', 'Norway')`
);


const result2 = await connection.execute(
    `
    SELECT * FROM Persons`
);


    res.send(result2)
})

app.listen(8080, () => {
      console.log('server listening on port 8080')
})