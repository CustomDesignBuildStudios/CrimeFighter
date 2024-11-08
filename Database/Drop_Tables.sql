DROP TABLE cf_crime CASCADE CONSTRAINTS;
DROP TABLE cf_account CASCADE CONSTRAINTS;
DROP TABLE cf_public_comment CASCADE CONSTRAINTS;
DROP TABLE cf_police CASCADE CONSTRAINTS;

DROP SEQUENCE cf_crimeInsert;
DROP SEQUENCE cf_accountInsert;
DROP SEQUENCE cf_commentInsert;
DROP SEQUENCE cf_policeInsert;

DROP TABLE cf_premistype CASCADE CONSTRAINTS;
DROP SEQUENCE cf_premisTypeInsert;
DROP TABLE cf_racetype CASCADE CONSTRAINTS;
DROP SEQUENCE cf_raceTypeInsert;
DROP TABLE cf_crimetype CASCADE CONSTRAINTS;
DROP SEQUENCE cf_crimeTypeInsert;
