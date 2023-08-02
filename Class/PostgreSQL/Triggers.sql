-- TRIGGERS
CREATE TABLE AUDIT(
   EMP_ID INT NOT NULL,
   ENTRY_DATE TEXT NOT NULL
);

select * from company
select * from audit 


CREATE OR REPLACE FUNCTION auditlogfunc() RETURNS TRIGGER AS $example_table$
   BEGIN
      INSERT INTO AUDIT(EMP_ID, ENTRY_DATE) VALUES (new.ID, current_timestamp);
      RETURN NEW;
   END;
$example_table$ LANGUAGE plpgsql;

CREATE TRIGGER example_trigger AFTER INSERT ON company
FOR EACH ROW EXECUTE PROCEDURE auditlogfunc();

INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
VALUES (15, 'Hrithik', 21, 'Tumakur', 80000.00 );