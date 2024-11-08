

CREATE TABLE cf_crime(
    DR_NO NUMBER NOT NULL,
    DateRptd DATE NOT NULL,
    DateTimeOcc TIMESTAMP NOT NULL,
    Area VARCHAR2(2) NOT NULL,
    AreaName VARCHAR2(50) NOT NULL,
    RptDistNum VARCHAR2(4) NOT NULL,
    Part12 NUMBER NOT NULL,
    CrmCd VARCHAR2(3) NOT NULL,
    CrmCdDesc VARCHAR2(100) NOT NULL,
    Mocodes VARCHAR2(50) NULL,
    VictAge NUMBER NULL,
    VictSex VARCHAR2(1) NULL,
    VictDescent VARCHAR2(1) NULL,
    PremisCd NUMBER NULL,
    PremisDesc VARCHAR2(100) NULL,
    WeaponUsedCd VARCHAR2(3) NULL,
    WeaponDesc VARCHAR2(50) NULL,
    Status VARCHAR2(2) NULL,
    StatusDesc VARCHAR2(50) NOT NULL,
    CrmCd1 VARCHAR2(3) NULL,
    CrmCd2 VARCHAR2(3) NULL,
    CrmCd3 VARCHAR2(3) NULL,
    CrmCd4 VARCHAR2(3) NULL,
    Loc VARCHAR2(200) NOT NULL,
    CrossStreet VARCHAR2(50) NULL,
    lat NUMBER NOT NULL,
    lon NUMBER NOT NULL,
    PRIMARY KEY (DR_NO)
);







CREATE TABLE cf_account(
    AccountID NUMBER,
    Email VARCHAR2(50) NOT NULL,
    Password VARCHAR2(50) NOT NULL,
    FirstName VARCHAR2(50) NOT NULL,
    LastName VARCHAR2(50) NOT NULL,
    Phone VARCHAR2(30),
    Bio VARCHAR2(250),
    HomeAddress VARCHAR2(250),
    DateCreated TIMESTAMP NOT NULL,
    Reports NUMBER,
    PRIMARY KEY (AccountID)
);
ALTER TABLE cf_account ADD CONSTRAINT CF_AccountREFCrime
  FOREIGN KEY (Reports) REFERENCES cf_crime(DR_NO)
  INITIALLY DEFERRED DEFERRABLE;





CREATE TABLE cf_public_comment(
    CommentID NUMBER,
    CrimeID NUMBER,
    AccountID NUMBER,
    UserComment VARCHAR2(250),
    DatePosted TIMESTAMP,
    PRIMARY KEY (CommentID)
);
ALTER TABLE cf_public_comment ADD CONSTRAINT CF_CommentREFAccount
  FOREIGN KEY (AccountID) REFERENCES cf_crime(DR_NO)
  INITIALLY DEFERRED DEFERRABLE;
ALTER TABLE cf_public_comment ADD CONSTRAINT CF_CommentREFCrime
  FOREIGN KEY (CrimeID) REFERENCES cf_crime(DR_NO)
  INITIALLY DEFERRED DEFERRABLE;











CREATE TABLE cf_police(
    BadgeNumber NUMBER,
    AssignedTo NUMBER,
    PRIMARY KEY (BadgeNumber)
);
ALTER TABLE cf_police ADD CONSTRAINT FK_PoliceREFCrime
  FOREIGN KEY (AssignedTo) REFERENCES cf_crime(DR_NO)
  INITIALLY DEFERRED DEFERRABLE;
 





















CREATE SEQUENCE cf_crimeInsert START WITH 300000000 INCREMENT BY 1;
CREATE SEQUENCE cf_accountInsert START WITH 100000 INCREMENT BY 1;
CREATE SEQUENCE cf_commentInsert START WITH 50000 INCREMENT BY 1;
CREATE SEQUENCE cf_policeInsert START WITH 10000 INCREMENT BY 1;



CREATE TABLE cf_premistype(
    id NUMBER NOT NULL,
    type VARCHAR2(5) NOT NULL,
    value VARCHAR2(100) NOT NULL,
    PRIMARY KEY (id)
);
CREATE SEQUENCE cf_premisTypeInsert START WITH 100 INCREMENT BY 1;


CREATE TABLE cf_racetype(
    id NUMBER NOT NULL,
    type VARCHAR2(1) NOT NULL,
    value VARCHAR2(50) NOT NULL,
    PRIMARY KEY (id)
);
CREATE SEQUENCE cf_raceTypeInsert START WITH 100 INCREMENT BY 1;


CREATE TABLE cf_crimetype(
    id NUMBER NOT NULL,
    type VARCHAR2(5) NOT NULL,
    value VARCHAR2(200) NOT NULL,
    PRIMARY KEY (id)
);
CREATE SEQUENCE cf_crimeTypeInsert START WITH 100 INCREMENT BY 1;
