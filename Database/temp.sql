-- ALTER TABLE cf_public_comment 
-- DROP CONSTRAINT CF_CommentREFAccount;

-- ALTER TABLE cf_public_comment ADD CONSTRAINT CF_CommentREFAccount
--   FOREIGN KEY (AccountID) REFERENCES cf_account(AccountID)
--   INITIALLY DEFERRED DEFERRABLE;

-- ALTER TABLE cf_crime 
-- ADD AccountID NUMBER;


-- ALTER TABLE cf_crime ADD CONSTRAINT CF_CrimeRefAccount
--   FOREIGN KEY (AccountID) REFERENCES cf_account(AccountID)
--   INITIALLY DEFERRED DEFERRABLE;

-- ALTER TABLE cf_crime
-- MODIFY Part12 NUMBER DEFAULT 1;


-- SELECT * FROM "ANDREW.BALLARD".cf_crime WHERE Status='CC' FETCH NEXT 20 ROWS ONLY;

-- Juv Other
-- Juv Arrest
-- UNK
-- SELECT * FROM "ANDREW.BALLARD".CF_Crime WHERE VictDescent IS NULL;
-- SELECT * FROM "ANDREW.BALLARD".CF_Crime WHERE VictDescent IS NULL;

-- UPDATE "ANDREW.BALLARD".CF_Crime
-- SET VictDescent = 'X'
-- WHERE VictDescent IS NULL;