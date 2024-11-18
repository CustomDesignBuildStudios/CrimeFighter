import { mysqlPassword, mysqlUser } from "./env.js";
import express from "express";
import cors from "cors";
import oracledb from "oracledb";
import moment from 'moment';


const app = express();
// const crimeData = require('./data.json');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

// const weaponsData = {
//     'GUN':{ title: 'Firearm', values:["105","115","122","125","108","116","120","121","123","111","118","119","117","124","110","103","102","106","104","101","114","109"] },
//     'ANIMAL':{ title: 'Animal', values:["516"] },
//     'VEHICLE':{ title: 'Vehicle', values:["307"] },
//     'PHYSICAL':{ title: 'Physical Force', values:["400"] },
//     'EXPLOSIVE':{ title: 'Explosives', values:["505"] },
//     'OTHER':{ title: 'Other', values:[] },
//     'MELEE':{ title: 'Melee Weapon', values:["301","200","305","205","215","223","217","214","209","308","207","211","213","210","219","514","202","221"] },
  
//   };


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
                `SELECT * FROM "ANDREW.BALLARD".CF_Account WHERE email=:email`,
                {
                    email: email
                }
            );
    
            if(result.rows.length > 0){
                res.status(500).send("Another account has same email");
            }else{
                
                

                const result = await connection.execute(
                    `INSERT INTO "ANDREW.BALLARD".CF_Account (AccountID, email, password,FirstName,LastName,DateCreated) VALUES (cf_accountInsert.NEXTVAL, :email, :password, :firstName, :lastName, SYSDATE)`,
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
                `SELECT * FROM "ANDREW.BALLARD".CF_Account WHERE password=:password AND email=:email`,
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
          `INSERT INTO "ANDREW.BALLARD".CF_Account (AccountID, email, password,FirstName,LastName,DateCreated) VALUES (cf_accountInsert.NEXTVAL, :email, :password, :firstName, :lastName, SYSDATE)`,
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
      }catch (error) {
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
        `SELECT * FROM "ANDREW.BALLARD".CF_Account WHERE password=:password AND email=:email`,
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



app.post("/profile", async (req, res) => {
  let connection;
  try {
    // Establish connection
    connection = await oracledb.getConnection({
      user: mysqlUser,
      password: mysqlPassword,
      connectString: "oracle.cise.ufl.edu/orcl",
    });

    const user = req.body["user"] ?? {};
    const FirstName = user['firstName'] ?? "";
    const LastName = user['lastName'] ?? "";
    const Phone = user['phone'] ?? "";
    const Bio = user['bio'] ?? "";
    const AccountID = user['accountId'] ?? -1;


    console.log(user);
    console.log(FirstName);
    console.log(LastName);
    console.log(Phone);
    console.log(AccountID);

    if (user== {}) {
      res.status(500).send("Error executing query");
    } else {
      const result = await connection.execute(
        `UPDATE "ANDREW.BALLARD".cf_account SET FirstName=:FirstName, LastName=:LastName, Phone=:Phone, Bio=:Bio WHERE AccountID=:AccountID`,
        {
          FirstName: FirstName,
          LastName: LastName,
          Phone: Phone,
          Bio: Bio,
          AccountID: AccountID,
        }
      );
      console.log(result);

      if (result.rowsAffected > 0) {
        res.json(user);
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








app.post("/get-comments", async (req, res) => {
  let connection;
  try {
    // Establish connection
    connection = await oracledb.getConnection({
      user: mysqlUser,
      password: mysqlPassword,
      connectString: "oracle.cise.ufl.edu/orcl",
    });


    const CrimeID = req.body['CrimeID'] ?? "";



    if (CrimeID=="") {
      res.status(500).send("Error executing query");
    } else {
      const result = await connection.execute(
        `SELECT "ANDREW.BALLARD".cf_public_comment.UserComment,"ANDREW.BALLARD".cf_account.FirstName FROM "ANDREW.BALLARD".cf_public_comment JOIN "ANDREW.BALLARD".cf_account ON cf_account.AccountID=cf_public_comment.AccountID WHERE CrimeID=:CrimeID ORDER BY DatePosted DESC`,
        {
          CrimeID: CrimeID,
        }
      );
      console.log(result);

      if (result.rows.length > 0) {
        res.json(result.rows);
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


app.post("/add-comment", async (req, res) => {
  let connection;
  try {
    // Establish connection
    connection = await oracledb.getConnection({
      user: mysqlUser,
      password: mysqlPassword,
      connectString: "oracle.cise.ufl.edu/orcl",
    });


    const CrimeID = req.body['CrimeID'] ?? "";
    const AccountID = req.body['AccountID'] ?? "";
    const UserComment = req.body['UserComment'] ?? "";



    if (CrimeID=="" || AccountID=="" || UserComment=="") {
      res.status(500).send("Error executing query");
    } else {
      let acc = "";
      if(AccountID == ""){
        acc = `AccountID=:AccountID`
      }
      console.log(`INSERT INTO "ANDREW.BALLARD".cf_public_comment (CommentID, CrimeID, AccountID, UserComment,DatePosted) VALUES (cf_commentInsert.NEXTVAL,:CrimeID,:AccountID,:UserComment,SYSTIMESTAMP)`)
      const result = await connection.execute(
        `INSERT INTO "ANDREW.BALLARD".cf_public_comment (CommentID, CrimeID, AccountID, UserComment,DatePosted) VALUES (cf_commentInsert.NEXTVAL,:CrimeID,:AccountID,:UserComment,SYSTIMESTAMP)`,
        {
          AccountID: AccountID,
          CrimeID: CrimeID,
          UserComment: UserComment,
        }
      );
      console.log(result);

      if (result.rowsAffected > 0) {
        res.json(true);
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











app.post("/add-report", async (req, res) => {
  let connection;
  try {
    // Establish connection
    connection = await oracledb.getConnection({
      user: mysqlUser,
      password: mysqlPassword,
      connectString: "oracle.cise.ufl.edu/orcl",
    });


   
    if (req.body['data']==null) {
      res.status(500).send("Error executing query");
    } else {
      let data = req.body['data'];
      data['DR_NO'] = Math.floor(Date.now() / 1000);
      data['RPTDISTNUM'] = data['AREA'] + '00';
  


      const columns = [...Object.keys(data), 'DateRptd', 'DateTimeOcc'].join(', ');
      const placeholders = [...Object.keys(data).map(key => `:${key}`), 'SYSDATE', 'CURRENT_TIMESTAMP'].join(', ');
      
      const sql = `INSERT INTO "ANDREW.BALLARD".cf_crime (${columns}) VALUES (${placeholders})`;
      console.log(data);
      console.log(sql);
      const result = await connection.execute(sql, data);
      if (result.rowsAffected > 0) {
        res.json(true);
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
















function transformArrayToSQLIn(arr){
    let str = "(";
    for (let index = 0; index < arr.length; index++) {
        str+="'"+arr[index]+"',";
        
    }
    str = str.substring(0, str.length - 1);
    str+=")";
    return str;
}
function transformAgeArrayIntoSQL(arr){
    let str = "";
    for (let index = 0; index < arr.length; index++) {
        if(arr[index] == "100+"){
            str+=`(Victage > 100) OR`;
        }else{
            let [start, end] = arr[index].split("-");
            str+=`(Victage BETWEEN ${start} AND ${end}) OR`;
        }
        
    }
    str = str.substring(0, str.length - 2);
    str+=" AND";
    return str;
}
function transformWeaponArrayIntoSQL(arr){
    if(arr.length == 1 && arr[0] == "OTHER"){
        return "";
    }else{
        let str = " WeaponUsedCd IN (";
        for (let index = 0; index < arr.length; index++) {
            if(arr[index] == "GUN")str += `'105','115','122','125','108','116','120','121','123','111','118','119','117','124','110','103','102','106','104','101','114','109',`;
            else if(arr[index] == "MELLE")str += `'301','200','305','205','215','223','217','214','209','308','207','211','213','210','219','514','202','221',`;
            else if(arr[index] == "VEHICLE")str += `'307',`;
            else if(arr[index] == "ANIMAL")str += `'516',`;
            else if(arr[index] == "PHYSICAL")str += `'400',`;
            else if(arr[index] == "EXPLOSIVE")str += `'505',`;
        }
    
        str = str.substring(0, str.length - 1);
        str+=") AND";
        return str;
    }
}
function transformCrimeArrayIntoSQL(arr){
    if(arr.length == 1 && arr[0] == "OTHER"){
        return "";
    }else{
        let str = "(";
        for (let index = 0; index < arr.length; index++) {
            if(arr[index] == "THEFT")str += `'510','330','480','343','354','341','668','420','440','441','310','331','210','662','440','442','352',`;
            if(arr[index] == "ASSAULT")str += `'624','230',`;
            if(arr[index] == "SEXUAL ASSAULT")str += `'821','762','860','810','815',`;
            if(arr[index] == "EXTORTION")str += `'940',`;
            if(arr[index] == "RAPE")str += `'121',`;
            if(arr[index] == "ARSON")str += `'648',`;
            if(arr[index] == "THREATS")str += `'930',`;
        }
        str = str.substring(0, str.length - 1);
        str+=") AND";
        return str;
    }
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
        const groupBy = req.body['groupBy'] ?? "NONE";
        let user = req.body['user'] ?? null;
        const showUser = req.body['showUser'] ?? null;
        if(showUser != null && showUser['type'] != 'user' ){
          user = null;
        }
        console.log(user)

        
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
        if(crime.length > 0){whereStatement += " CrmCd IN " + transformCrimeArrayIntoSQL(crime);}
        const premis = req.body['premis'] ?? [];
        if(premis.length > 0){whereStatement += " PremisCd IN " + transformArrayToSQLIn(premis) + " AND";}
        const gender = req.body['gender'] ?? [];
        if(gender.length > 0){whereStatement += " VictSex IN " + transformArrayToSQLIn(gender) + " AND";}
        const age = req.body['age'] ?? [];
        if(age.length > 0){whereStatement += transformAgeArrayIntoSQL(age);}
        const weapon = req.body['weapon'] ?? [];
        if(weapon.length > 0){whereStatement += transformWeaponArrayIntoSQL(weapon);}
        if(user != null){whereStatement += ` AccountID = ${user['accountId']} AND`}

        console.log(whereStatement);
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
                `SELECT Area, COUNT(*) AS CrimeCount FROM "ANDREW.BALLARD".CF_Crime `+whereStatement+ ` GROUP BY Area`
            );
    
            res.json({type:type,results:result.rows});
        }else{
            const validColumns = ['DR_NO','DATETIMEOCC','DATERPTD']; 
            if (!validColumns.includes(orderBy)) {
                return res.status(400).send("Invalid column name for ordering");
            }

            let selectVars = "*";
            let groupStatement = "";
            let orderAndLimitStatement = "";
            if(type=="CHART"){
                if(groupBy == "WEAPONUSEDCD"){
                    selectVars = `
                    CASE 
                    WHEN `+groupBy+` IN ('105','115','122','125','108','116','120','121','123','111','118','119','117','124','110','103','102','106','104','101','114','109') THEN 'GUN'
                    WHEN `+groupBy+` IN ('301','200','305','205','215','223','217','214','209','308','207','211','213','210','219','514','202','221') THEN 'MELLE'
                    WHEN `+groupBy+` IN ('307') THEN 'VEHICLE'
                    WHEN `+groupBy+` IN ('516') THEN 'ANIMAL'
                    WHEN `+groupBy+` IN ('400') THEN 'PHYSICAL'
                    WHEN `+groupBy+` IN ('505') THEN 'EXPLOSIVE'
                    ELSE 'OTHER'
                    END AS LABEL, COUNT(*) AS COLCOUNT
                    `;
                    groupStatement = ` GROUP BY CASE 
                    WHEN `+groupBy+` IN ('105','115','122','125','108','116','120','121','123','111','118','119','117','124','110','103','102','106','104','101','114','109') THEN 'GUN'
                    WHEN `+groupBy+` IN ('301','200','305','205','215','223','217','214','209','308','207','211','213','210','219','514','202','221') THEN 'MELLE'
                    WHEN `+groupBy+` IN ('307') THEN 'VEHICLE'
                    WHEN `+groupBy+` IN ('516') THEN 'ANIMAL'
                    WHEN `+groupBy+` IN ('400') THEN 'PHYSICAL'
                    WHEN `+groupBy+` IN ('505') THEN 'EXPLOSIVE'
                    ELSE 'OTHER'
                    END`;

                }
                else if(groupBy == "CRMCD"){
                    selectVars = `
                    CASE 
                    WHEN `+groupBy+` IN ('510','330','480','343','354','341','668','420','440','441','310','331','210','662','440','442','352') THEN 'THEFT'
                    WHEN `+groupBy+` IN ('624','230') THEN 'ASSAULT'
                    WHEN `+groupBy+` IN ('821','762','860','810','815') THEN 'SEXUAL ASSAULT'
                    WHEN `+groupBy+` IN ('940') THEN 'EXTORTION'
                    WHEN `+groupBy+` IN ('121') THEN 'RAPE'
                    WHEN `+groupBy+` IN ('648') THEN 'ARSON'
                    WHEN `+groupBy+` IN ('930') THEN 'THREATS'
                    ELSE 'OTHER'
                    END AS LABEL, COUNT(*) AS COLCOUNT
                    `;
                    groupStatement = ` GROUP BY CASE 
                    WHEN `+groupBy+` IN ('510','330','480','343','354','341','668','420','440','441','310','331','210','662','440','442','352') THEN 'THEFT'
                    WHEN `+groupBy+` IN ('624','230') THEN 'ASSAULT'
                    WHEN `+groupBy+` IN ('821','762','860','810','815') THEN 'SEXUAL ASSAULT'
                    WHEN `+groupBy+` IN ('940') THEN 'EXTORTION'
                    WHEN `+groupBy+` IN ('121') THEN 'RAPE'
                    WHEN `+groupBy+` IN ('648') THEN 'ARSON'
                    WHEN `+groupBy+` IN ('930') THEN 'THREATS'
                    ELSE 'OTHER'
                    END`;

                }else if(groupBy == "VICTAGE"){
                    selectVars = `
                    CASE 
                    WHEN `+groupBy+` BETWEEN 0 AND 20 THEN '0-20'
                    WHEN `+groupBy+` BETWEEN 21 AND 40 THEN '21-40'
                    WHEN `+groupBy+` BETWEEN 41 AND 60 THEN '41-60'
                    WHEN `+groupBy+` BETWEEN 61 AND 80 THEN '61-80'
                    WHEN `+groupBy+` BETWEEN 81 AND 100 THEN '81-100'
                    ELSE '100+'
                    END AS LABEL, COUNT(*) AS COLCOUNT
                    `;
                    groupStatement = ` GROUP BY CASE 
                    WHEN `+groupBy+` BETWEEN 0 AND 20 THEN '0-20'
                    WHEN `+groupBy+` BETWEEN 21 AND 40 THEN '21-40'
                    WHEN `+groupBy+` BETWEEN 41 AND 60 THEN '41-60'
                    WHEN `+groupBy+` BETWEEN 61 AND 80 THEN '61-80'
                    WHEN `+groupBy+` BETWEEN 81 AND 100 THEN '81-100'
                    ELSE '100+'
                    END`;

                }else{
                    selectVars = groupBy + " AS LABEL,COUNT(" + groupBy + ") AS COLCOUNT";
                    groupStatement = " GROUP BY "+groupBy + " ";
                }


            }else{
                orderAndLimitStatement = `ORDER BY ${orderBy} ${orderByDir} OFFSET ${(page*amount)} ROWS FETCH NEXT ${amount} ROWS ONLY`
            }

            console.log(`SELECT `+selectVars+` FROM "ANDREW.BALLARD".CF_Crime `+whereStatement+ ` `+groupStatement+` `+orderAndLimitStatement)
    
            const result = await connection.execute(
                `SELECT `+selectVars+` FROM "ANDREW.BALLARD".CF_Crime `+whereStatement+ ` `+groupStatement+` `+orderAndLimitStatement
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











app.post('/advance/area-crime', async (req, res) => {
    let connection;
    try {
        // Establish connection
        connection = await oracledb.getConnection({
            user: mysqlUser,
            password: mysqlPassword,
            connectString: "oracle.cise.ufl.edu/orcl"
        });

        const year = parseInt(req.body['year'] ?? 2020);


        const result = await connection.execute(
            `
            SELECT
                TO_CHAR(DateTimeOcc, 'YYYY-MM') AS Month,
                AreaName,
                COUNT(*) AS SevereCrimeCount
            FROM
                "ANDREW.BALLARD".cf_crime
            WHERE
                CrmCd IN ('230', '821', '121', '113', '435', '822', '921', '865', '943', '812', '235', '840', '860', '110', '814', '648')
                AND EXTRACT(YEAR FROM DateTimeOcc) = ${year}
            GROUP BY TO_CHAR(DateTimeOcc, 'YYYY-MM'),AreaName
            ORDER BY Month, SevereCrimeCount DESC
            `
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




app.post('/advance/gender-time', async (req, res) => {
  let connection;
  try {
      // Establish connection
      connection = await oracledb.getConnection({
          user: mysqlUser,
          password: mysqlPassword,
          connectString: "oracle.cise.ufl.edu/orcl"
      });

      const result = await connection.execute(
          `
SELECT
    TO_CHAR(DateTimeOcc, 'YYYY-MM') AS Month,
    VictSex AS Sex,
    CASE
        WHEN VictAge BETWEEN 0 AND 17 THEN '0-17'
        WHEN VictAge BETWEEN 18 AND 30 THEN '18-30'
        WHEN VictAge BETWEEN 31 AND 40 THEN '31-40'
        WHEN VictAge BETWEEN 41 AND 50 THEN '41-50'
        WHEN VictAge BETWEEN 51 AND 64 THEN '51-64'
        WHEN VictAge > 64 THEN '65+'
        ELSE 'Unspecified'
    END AS AgeGroup,
    COUNT(*) AS VictimCount
FROM
    "ANDREW.BALLARD".cf_crime
WHERE
    VictAge IS NOT NULL
    AND VictSex IS NOT NULL
GROUP BY
    TO_CHAR(DateTimeOcc, 'YYYY-MM'),
    VictSex,
    CASE
        WHEN VictAge BETWEEN 0 AND 17 THEN '0-17'
        WHEN VictAge BETWEEN 18 AND 30 THEN '18-30'
        WHEN VictAge BETWEEN 31 AND 40 THEN '31-40'
        WHEN VictAge BETWEEN 41 AND 50 THEN '41-50'
        WHEN VictAge BETWEEN 51 AND 64 THEN '51-64'
        WHEN VictAge > 64 THEN '65+'
        ELSE 'Unspecified'
    END
ORDER BY
    Month,
    AgeGroup,  
    Sex,     
    VictimCount DESC
          `
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









app.post('/advance/crime-month', async (req, res) => {
  let connection;
  try {
      // Establish connection
      connection = await oracledb.getConnection({
          user: mysqlUser,
          password: mysqlPassword,
          connectString: "oracle.cise.ufl.edu/orcl"
      });


      const year = parseInt(req.body['year'] ?? 2020);
      const month = parseInt(req.body['month'] ?? 1);


      const result = await connection.execute(
          `
SELECT
    TO_CHAR(DateTimeOcc, 'YYYY-MM') AS Month,
    CrmCdDesc AS CrimeType,
    COUNT(*) AS CrimeCount
FROM
    "ANDREW.BALLARD".cf_crime
WHERE
    EXTRACT(YEAR FROM DateTimeOcc) = ${year}
    AND
    EXTRACT(MONTH FROM DateTimeOcc) = ${month}
GROUP BY
    TO_CHAR(DateTimeOcc, 'YYYY-MM'),
    CrmCdDesc
ORDER BY
    Month,
    CrimeCount DESC
          `
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
  console.log("server listening on port 8080");
});
