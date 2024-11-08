SELECT * FROM CF_Crime ORDER BY VictAge ASC FETCH FIRST 5 ROWS ONLY;
SELECT * FROM CF_Crime ORDER BY VictAge ASC OFFSET 5 ROWS FETCH FIRST 5 ROWS ONLY;
SELECT * FROM CF_Crime WHERE VictSex='M' FETCH FIRST 5 ROWS ONLY;
SELECT * FROM CF_Crime WHERE WeaponUsedCd IN (400) FETCH FIRST 5 ROWS ONLY;
SELECT * FROM CF_Crime
WHERE DateRptd >= TO_DATE('01/01/2020', 'MM/DD/YYYY')
  AND DateRptd <= TO_DATE('01/10/2020', 'MM/DD/YYYY')
    FETCH FIRST 5 ROWS ONLY;
SELECT * FROM CF_Crime WHERE VictDescent IN ('W') FETCH FIRST 5 ROWS ONLY;

-- SELECT * FROM crime WHERE victim_race IN ('ASIAN', 'WHITE');
-- SELECT * FROM crime WHERE lat < '34.623' AND lat > '34.100' AND lng < '118.233' AND lng > '118.001';
-- SELECT * FROM crime WHERE date_occ >= '2000-01-01' AND date_occ <= '2020-01-01' AND time_occ >= '15:00:00' AND time_occ <= '20:00:00' AND type == 'ROBBERY' AND weapon == 'GUN' AND victim_sex == 'MALE' AND victim_race == 'ASIAN' AND victim_age > 29 AND area == 'Downtown' AND lat < '34.623' AND lat > '34.100' AND lng < '118.233' AND lng > '118.001' LIMIT 10 OFFSET 20 ORDER BY ASC;