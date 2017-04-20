CREATE TABLE Users (
    completeName VARCHAR(30) NOT NULL,
    userName VARCHAR(30) NOT NULL PRIMARY KEY,
    password VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    RFC VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    zipcode VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR (50) NOT NULL
);

CREATE TABLE Receipts (
    folio INT  NOT NULL PRIMARY KEY,
    billing VARCHAR(500) NOT NULL,
    amount VARCHAR(50) NOT NULL,
    fecha VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL
);

CREATE TABLE Buy(
    orderNo INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    billing VARCHAR(50) NOT NULL,
    amount VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(500) NOT NULL
);

INSERT INTO Users(completeName, userName, password, email, RFC, address, zipcode, city, state)
VALUES  ('Vicente Gutierrez' , 'vicentecacep', 'babay',  'vicente_cacep@hotmail.com','GUCV630610GY7', 'CAMINO VECINAL SN SUR 5A SECCION', '86657', 'COMALCALCO', 'TABASCO');

INSERT INTO Receipts(folio, billing, amount, fecha, username)
VALUES  (10010120, 'VICENTE ALBERTO GUTIERREZ CACEP
CAMINO VECINAL SN SUR 5A SECCION
86657
COMALCALCO, TABASCO','$2000.00','18/March/2017', 'vicentecacep');

INSERT INTO Buy(billing, amount, name, description)
VALUES  ('TEC DE MONTERREY', '$120.00', 'LUIS GOMEZ', '2x60 70% Bar');
