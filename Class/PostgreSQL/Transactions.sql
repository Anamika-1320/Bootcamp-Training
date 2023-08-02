CREATE TABLE accounts (
    id INT PRIMARY KEY ,
    name VARCHAR(100) NOT NULL,
    balance DEC(15,2) NOT NULL
);

select * from accounts;

INSERT INTO accounts(id,name,balance)
VALUES(1,'Bob',10000);

BEGIN;

INSERT INTO accounts(id,name,balance)
VALUES(2,'Alice',10000);

COMMIT;

select * from accounts;
BEGIN;

--and subtracting 1000USD from Bob’s account with id 1:
UPDATE accounts 
SET balance = balance - 1000
WHERE id = 1;

UPDATE accounts
SET balance = balance + 1000
WHERE id = 2;

COMMIT;

select * from accounts;
BEGIN;

--and subtracting 1000USD from Bob’s account with id 1:
UPDATE accounts 
SET balance = balance + 1000
WHERE id = 1;

UPDATE accounts
SET balance = balance + 1000
WHERE id = 2;
ROLLBACK;
COMMIT;