import { mysqlPassword, mysqlUser } from "./env.js";
import express from "express";
import cors from "cors";
import oracledb from "oracledb";

const app = express();
// const crimeData = require('./data.json');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  let connection;
  try {
    // Establish connection
    connection = await oracledb.getConnection({
      user: mysqlUser,
      password: mysqlPassword,
      connectString: "oracle.cise.ufl.edu/orcl",
    });

    const password = req.body["password"] ?? "";
    const email = req.body["email"] ?? "";
    const firstName = req.body["firstName"] ?? "";
    const lastName = req.body["lastName"] ?? "";

    if (password == "" || email == "" || lastName == "" || firstName == "") {
      res.status(500).send("Missing parameters");
    } else {
      const result = await connection.execute(
        `SELECT * FROM CF_Account WHERE password=:password AND email=:email`,
        {
          password: password,
          email: email,
        }
      );

      if (result.rows.length > 0) {
        res.json(false);
      } else {
        const result = await connection.execute(
          `INSERT INTO CF_Account (AccountID, email, password,FirstName,LastName,DateCreated) VALUES (cf_accountInsert.NEXTVAL, :email, :password, :firstName, :lastName, SYSDATE)`,
          {
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName,
          },
          { autoCommit: true }
        );

        if (result.rowsAffected == 1) {
          res.json(true);
        } else {
          res.json(false);
        }
      }
    }
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
});
app.post("/login", async (req, res) => {
  let connection;
  try {
    // Establish connection
    connection = await oracledb.getConnection({
      user: mysqlUser,
      password: mysqlPassword,
      connectString: "oracle.cise.ufl.edu/orcl",
    });

    const password = req.body["password"] ?? "";
    const email = req.body["email"] ?? "";

    if (password == "" || email == "") {
      res.status(500).send("Error executing query");
    } else {
      const result = await connection.execute(
        `SELECT * FROM CF_Account WHERE password=:password AND email=:email`,
        {
          password: password,
          email: email,
        }
      );

      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.json(false);
      }
    }
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
});

app.get("/", async (req, res) => {
  let connection;
  try {
    // Establish connection
    connection = await oracledb.getConnection({
      user: mysqlUser,
      password: mysqlPassword,
      connectString: "oracle.cise.ufl.edu/orcl",
    });

    // Execute the SELECT statement
    const result = await connection.execute(
      `SELECT * FROM CF_Crime ORDER BY VictAge ASC FETCH FIRST 5 ROWS ONLY`
    );

    // Send the query result rows as a response
    res.json(result.rows); // `rows` contains the query results as an array of objects
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
});

// app.get('/crime-item', async (req, res) => {
//     let connection;
//     try {
//         // Establish connection
//         connection = await oracledb.getConnection({
//             user: mysqlUser,
//             password: mysqlPassword,
//             connectString: "oracle.cise.ufl.edu/orcl"
//         });

//         const id = req.query.id || '0';

//         if(id=='0'){
//             res.json([]);
//         }else{
//             const result = await connection.execute(
//                 `SELECT * FROM CF_Crime WHERE DR_NO=${orderBy}`
//             );

//             // Send the query result rows as a response
//             res.json(result.rows);  // `rows` contains the query results as an array of objects
//         }

//     } catch (error) {
//         console.error("Error executing query:", error);
//         res.status(500).send("Error executing query");
//     } finally {
//         if (connection) {
//             try {
//                 await connection.close();
//             } catch (err) {
//                 console.error("Error closing connection:", err);
//             }
//         }
//     }
// })
// app.post('/crime-item', async (req, res) => {
//     let connection;
//     try {
//         // Establish connection
//         connection = await oracledb.getConnection({
//             user: mysqlUser,
//             password: mysqlPassword,
//             connectString: "oracle.cise.ufl.edu/orcl"
//         });

//         const data = req.body;

//         const result = await connection.execute(
//             `INSERT INTO CF_Crime VALUES ()`
//         );

//         res.json({ message: "Row inserted successfully", rowsAffected: result.rowsAffected });

//     } catch (error) {
//         console.error("Error executing query:", error);
//         res.status(500).send("Error executing query");
//     } finally {
//         if (connection) {
//             try {
//                 await connection.close();
//             } catch (err) {
//                 console.error("Error closing connection:", err);
//             }
//         }
//     }
// })

app.post("/data", async (req, res) => {
  let connection;
  try {
    // Establish connection
    connection = await oracledb.getConnection({
      user: mysqlUser,
      password: mysqlPassword,
      connectString: "oracle.cise.ufl.edu/orcl",
    });

    const orderBy = req.body["orderBy"] ?? "DR_NO";
    const limit = parseInt(req.body["limit"] ?? 10);
    const offset = parseInt(req.body["offset"] ?? 0);

    const validColumns = ["DR_NO"];
    if (!validColumns.includes(orderBy)) {
      return res.status(400).send("Invalid column name for ordering");
    }

    const result = await connection.execute(
      `SELECT * FROM CF_Crime ORDER BY ${orderBy} ASC OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY`,
      {
        offset: offset,
        limit: limit,
      }
    );

    // Send the query result rows as a response
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Error executing query");
  } finally {
    if (connection) {
      try {
        await connection.close();SELECT *
FROM CF_ACCOUNT;
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

app.listen(8080, () => {
  console.log("server listening on port 8080");
});
