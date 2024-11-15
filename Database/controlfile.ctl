LOAD DATA
INFILE 'datafile.dat'          -- Data file
INTO TABLE CF_Crime          -- Table to load data into
FIELDS TERMINATED BY ','       -- Field separator
OPTIONALLY ENCLOSED BY '"'     -- Optional character to enclose fields
(AccountID, DR_NO, DateRptd, DateTimeOcc,Area,AreaName,RptDistNum,Part12,CrmCd,CrmCdDesc,Mocodes,VictAge,VictSex,VictDescent,PremisCd,PremisDesc,WeaponUsedCd,WeaponDesc,Status,StatusDesc,CrmCd1,CrmCd2,CrmCd3,CrmCd4,Loc,CrossStreet,lat,lon)       -- Columns in the table

