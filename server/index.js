
const express = require('express');
const app = express();
const cors = require('cors');
const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = "yjjJvN87Z4En5EmSchBaJl6O"  // set mypw to the hr schema password




  
app.use(cors())

app.get('/', async (req, res) => {
    const connection = await oracledb.getConnection ({
        user          : "mtermotto",
        password      : mypw,
        connectString : "oracle.cise.ufl.edu/orcl"
    });

//     console.log(connection);
//     const result = await connection.execute(
//             `CREATE TABLE Persons (
//     PersonID int,
//     LastName varchar(255),
//     FirstName varchar(255),
//     Address varchar(255),
//     City varchar(255)
// )`
//     );

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