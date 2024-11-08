-- What are the monthly crime trends by type?
-- This trend query will offer the user graphs highlighting the number of crimes by type.
-- The time unit will be by month with the numerical unit as the number of crimes of a certain type.
SELECT
    -- use DateTimeOcc with the format of 'YYYY-MM' and store this as the month
    TO_CHAR(DateTimeOcc, 'YYYY-MM') AS Month,
    -- store the CrmCdDesc as the crime type to get the type of crime committed
    CrmCdDesc AS CrimeType,
    -- use count(*) to count each type of crime in a certain month
    COUNT(*) AS CrimeCount
FROM
    -- get the data from the cf_crime table
    cf_crime
WHERE
    -- use where with the year from DateTimeOcc to select the year
    EXTRACT(YEAR FROM DateTimeOcc) = :year
    AND
    -- and use where with the month from DateTimeOcc to select the month
    EXTRACT(MONTH FROM DateTimeOcc) = :month
GROUP BY
    -- group by the month and the crime type variable
    TO_CHAR(DateTimeOcc, 'YYYY-MM'),
    CrmCdDesc
ORDER BY
    -- order by month and have the crime type that is highest be at the top for that particular month, use DESC
    Month,
    CrimeCount DESC;

-- What time of day do different crime types occur?
-- This trend query will offer the user graphs that highlight the number of crimes by type committed at certain
-- times of the day. The time unit will be the hour and the numerical unit will be the number of crimes of a certain
-- type committed during that time.
SELECT
    -- https://www.w3schools.com/sql/func_mysql_extract.asp
    -- use EXTRACT to get the hour from the DateTimeOcc attribute and store it as Hour
    -- the Hour will show the time of day and it is in 24 hour time
    EXTRACT(HOUR FROM DateTimeOcc) AS Hour,
    -- store the CrmCdDesc as the crime type to get the type of crime committed
    CrmCdDesc AS CrimeType,
    -- use count(*) to count each type of crime in a certain hour of the day
    COUNT(*) AS CrimeCount
FROM
    -- get the data from the cf_crime table
    cf_crime
WHERE
    -- use where with hour from DateTimeOcc to select the hour
    EXTRACT(HOUR FROM DateTimeOcc) = :hour
GROUP BY
    -- group by the hour and crime type variables
    EXTRACT(HOUR FROM DateTimeOcc),
    CrmCdDesc
ORDER BY
    -- order by hour and have the crime type that is highest be at the top for that particular time of the day, use DESC
    Hour,
    CrimeCount DESC;

-- What is the crime density in a selected geographic area over time?
-- This trend query will show the user the density of crime in a geographical area over the course of a day, week,
-- month, or year. This will give insight into whether or not a certain area has more civilians who are reporting
-- crimes. The time unit will be the selected time amount and the numerical unit will be based on the number of crimes
-- committed within a geographical area on a map, there will also be an option to see the data in a graph view.
SELECT
    -- use DateTimeOcc with the format of 'YYYY-MM' and store this as the month
    TO_CHAR(DateTimeOcc, 'YYYY-MM') AS Month,
    -- use count(*) to count each type of crime in a certain area
    COUNT(*) AS CrimeCount
FROM
    -- get the data from the cf_crime table
    cf_crime
WHERE
    -- use where with the area name attribute to get a specific area
    AreaName = :area_name
    AND
    -- extract the year from DateTimeOcc to get the year selection
    EXTRACT(YEAR FROM DateTimeOcc) = :year
GROUP BY
    -- group by the month variable
    TO_CHAR(DateTimeOcc, 'YYYY-MM')
ORDER BY
    -- order by the month
    Month;

-- What are the victim trends based on sex and age over time?
-- This trend query will show the victim trends over the course of a day, week, month, or year. The user can select
-- this time in a drop down menu. The user will also select an age group for the data in the form of a drop down menu.
-- The time unit will be the selected amount and the numerical unit will be the number of male and female victims at a
-- certain time. This data will be presented in a stacked bar graph with the one stack representing the number of
-- female victims and the other stack representing the number of male victims.
SELECT
    -- use DateTimeOcc with the format of 'YYYY-MM' and store this as the month
    TO_CHAR(DateTimeOcc, 'YYYY-MM') AS Month,
    -- store the VictSex attribute as Sex
    VictSex AS Sex,
    -- have different cases for the different age groups and store is as AgeGroup
    CASE
        WHEN VictAge BETWEEN 0 AND 17 THEN '0-17'
        WHEN VictAge BETWEEN 18 AND 30 THEN '18-30'
        WHEN VictAge BETWEEN 31 AND 40 THEN '31-40'
        WHEN VictAge BETWEEN 41 AND 50 THEN '41-50'
        WHEN VictAge BETWEEN 51 AND 64 THEN '51-64'
        WHEN VictAge > 64 THEN '65+'
        ELSE 'Unspecified'
        END AS AgeGroup,
    -- use count(*) to count each type of crime commited against a distinct age group and sex
    COUNT(*) AS VictimCount
FROM
    -- get the data from the cf_crime table
    cf_crime
WHERE
  -- use where to ensure that the victim age is not null
     VictAge IS NOT NULL
     AND
    -- and ensure that the victim sex is not null
    VictSex IS NOT NULL
    AND
    -- use extract to get the year selection
    EXTRACT(YEAR FROM DateTimeOcc) = :year
    AND
    -- use extract to get the month selection
    EXTRACT(MONTH FROM DateTimeOcc) = :month
    AND
    -- use extract to get the hour of the day selection
    EXTRACT(HOUR FROM DateTimeOcc) = :hour
GROUP BY
    -- group by the month, VictSex, and the different age group cases
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
    -- order by the month, age group, sex, and the victim count
    Month, AgeGroup, Sex, VictimCount DESC;

-- What are the crime severity trends in a geographical area over time?
-- This trend query will show the user the severity of crimes in a certain area and will show the user if certain
-- areas have higher rates of more serious or violent crimes.  The user can use a drop down menu to select if they
-- want to see the data by day, week, month, or year. The time unit will be the selected amount and the numerical
-- unit will be the number of serious crimes that occurred in a certain area that will be displayed on a map. There
-- will also be an option to see this data in a graph view.
SELECT
    -- use DateTimeOcc with the format of 'YYYY-MM' and store this as the month
    TO_CHAR(DateTimeOcc, 'YYYY-MM') AS Month,
    -- select the area name attribute
    AreaName,
    -- use count(*) to count each type of severe crimes in a certain area
    COUNT(*) AS SevereCrimeCount
FROM
    -- get the data from the cf_crime table
    cf_crime
WHERE
  -- use where to include the different crime codes that are considered severe
    CrmCd IN ('230', '821', '121', '113', '435', '822', '921', '865', '943', '812', '235', '840', '860', '110', '814', '648')
    AND
    -- extract the year from DateTimeOcc to get the year selection
    EXTRACT(YEAR FROM DateTimeOcc) = :year
GROUP BY
    -- group by month and the area name
    TO_CHAR(DateTimeOcc, 'YYYY-MM'),
    AreaName
ORDER BY
    -- order by month and the crime count of the severe crimes
    Month, SevereCrimeCount DESC;

-- input needs single quotes around them like Newton needs to be 'Newton'