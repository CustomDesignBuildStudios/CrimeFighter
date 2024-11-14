
import { mysqlPassword,mysqlUser } from './env.js';
import express from 'express';
import cors from 'cors';
import oracledb from 'oracledb';

const app = express();
// const crimeData = require('./data.json');


oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;




app.use(express.json());
app.use(cors())
app.post('/register', async (req, res) => {
    let connection;
    try {
        // Establish connection
        connection = await oracledb.getConnection({
            user: mysqlUser,
            password: mysqlPassword,
            connectString: "oracle.cise.ufl.edu/orcl"
        });


        const password = req.body['password'] ?? "";
        const email = req.body['email'] ?? "";
        const firstName = req.body['firstName'] ?? "";
        const lastName = req.body['lastName'] ?? "";

     


        if(password == "" || email == "" || lastName == "" || firstName == ""){
            res.status(500).send("Missing parameters");
        }else{
            const result = await connection.execute(
                `SELECT * FROM CF_Account WHERE email=:email`,
                {
                    email: email
                }
            );
    
            if(result.rows.length > 0){
                res.status(500).send("Another account has same email");
            }else{
                
                

                const result = await connection.execute(
                    `INSERT INTO CF_Account (AccountID, email, password,FirstName,LastName,DateCreated) VALUES (cf_accountInsert.NEXTVAL, :email, :password, :firstName, :lastName, SYSDATE)`,
                    {
                        password: password,
                        email: email,
                        firstName: firstName,
                        lastName: lastName
                    },{ autoCommit: true }
                );


                if(result.rowsAffected == 1){
                    res.json(true); 
                }else{
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
})
app.post('/login', async (req, res) => {
    let connection;
    try {
        // Establish connection
        connection = await oracledb.getConnection({
            user: mysqlUser,
            password: mysqlPassword,
            connectString: "oracle.cise.ufl.edu/orcl"
        });


        const password = req.body['password'] ?? "";
        const email = req.body['email'] ?? "";

     


        if(password == "" || email == ""){
            res.status(500).send("Error executing query");
        }else{
            const result = await connection.execute(
                `SELECT * FROM CF_Account WHERE password=:password AND email=:email`,
                {
                    password: password,
                    email: email
                }
            );
    
            if(result.rows.length > 0){
                res.json(result.rows[0]);
            }else{
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
})



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
})


function transformArrayToSQLIn(arr){
    let str = "(";
    for (let index = 0; index < arr.length; index++) {
        str+="'"+arr[index]+"',";
        
    }
    str = str.substring(0, str.length - 1);
    str+=")";
    return str;
}


app.post('/general-data', async (req, res) => {
    let connection;
    try {
        // Establish connection
        connection = await oracledb.getConnection({
            user: mysqlUser,
            password: mysqlPassword,
            connectString: "oracle.cise.ufl.edu/orcl"
        });

   
        console.log(req.body);
        let orderBy = req.body['orderBy'] ?? "DR_NO";
        let orderByDir = "ASC";
        const amount = parseInt(req.body['amount'] ?? 20);
        const page = parseInt(req.body['page'] ?? 0);
        const type = req.body['type'] ?? "LIST";

        let whereStatement = "WHERE ";

        const occDateStart = req.body['occDateStart'] ?? "";
        if(occDateStart != ""){whereStatement += ` DateTimeOcc > TO_TIMESTAMP('`+ occDateStart +`', 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AND`;}
        const occDateEnd = req.body['occDateEnd'] ?? "";
        if(occDateEnd != ""){whereStatement += ` DateTimeOcc < TO_TIMESTAMP('`+ occDateEnd +`', 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AND`;}
        const rpDateStart = req.body['rpDateStart'] ?? "";
        if(rpDateStart != ""){whereStatement += ` DateRptd > TO_DATE('${rpDateStart.split('T')[0]}', 'YYYY-MM-DD') AND`;}
        const rpDateEnd = req.body['rpDateEnd'] ?? "";
        if(rpDateEnd != ""){whereStatement += ` DateRptd < TO_DATE('${rpDateEnd.split('T')[0]}', 'YYYY-MM-DD') AND`;}
        const descent = req.body['descent'] ?? [];
        if(descent.length > 0){whereStatement += " VictDescent IN " + transformArrayToSQLIn(descent) + " AND";}
        const status = req.body['status'] ?? [];
        if(status.length > 0){whereStatement += " Status IN " + transformArrayToSQLIn(status) + " AND";}
        const crime = req.body['crime'] ?? [];
        if(crime.length > 0){whereStatement += " CrmCd IN " + transformArrayToSQLIn(crime) + " AND";}
        const premis = req.body['premis'] ?? [];
        if(premis.length > 0){whereStatement += " PremisCd IN " + transformArrayToSQLIn(premis) + " AND";}
        const gender = req.body['gender'] ?? "";
        if(gender.length > 0){whereStatement += " VictSex IN " + transformArrayToSQLIn(gender) + " AND";}


        if (whereStatement.endsWith("AND")) {
            whereStatement = whereStatement.slice(0, -3); 
        }
        if(whereStatement.length == 6){
            whereStatement = "";
        }
        console.log(whereStatement);


        if(type != "MAP"){
            if(orderBy == "DATERPTD_DESC"){
                orderBy = "DATERPTD";
                orderByDir = "DESC";
            }
            else if(orderBy == "DATERPTD_ASC"){
                orderBy = "DATERPTD";
                orderByDir = "ASC";
            }
            else if(orderBy == "DATEOCC_DESC"){
                orderBy = "DATETIMEOCC";
                orderByDir = "DESC";
            }
            else{
                orderBy = "DATETIMEOCC";
                orderByDir = "ASC";
            }
        }


        if(type=="MAP"){
            const result = await connection.execute(
                `SELECT Area, COUNT(*) AS CrimeCount FROM CF_Crime `+whereStatement+ ` GROUP BY Area`
            );
    
            res.json({type:type,results:result.rows});
        }else{
            const validColumns = ['DR_NO','DATETIMEOCC','DATERPTD']; 
            if (!validColumns.includes(orderBy)) {
                return res.status(400).send("Invalid column name for ordering");
            }
    
            const result = await connection.execute(
                `SELECT * FROM CF_Crime `+whereStatement+ ` ORDER BY ${orderBy} ${orderByDir} OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY`,
                {
                    offset: (page*amount),
                    limit: amount
                }
            );
    
            // Send the query result rows as a response
            res.json({type:type,results:result.rows});
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











app.get('/advance/area-density', async (req, res) => {
    let connection;
    try {
        // Establish connection
        connection = await oracledb.getConnection({
            user: mysqlUser,
            password: mysqlPassword,
            connectString: "oracle.cise.ufl.edu/orcl"
        });

        const result = await connection.execute(
            `SELECT
                TO_CHAR(DateTimeOcc, 'YYYY-MM') AS Month,
                COUNT(*) AS CrimeCount
            FROM
                cf_crime
            WHERE
                AreaName = :area_name
                AND
                EXTRACT(YEAR FROM DateTimeOcc) = :year
            GROUP BY
                TO_CHAR(DateTimeOcc, 'YYYY-MM')
            ORDER BY
                Month;`
        );

        res.json(result.rows);



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

app.listen(8080, () => {
      console.log('server listening on port 8080')
})
