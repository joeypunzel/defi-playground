
--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  categoryID int(11) NOT NULL AUTO_INCREMENT,
  categoryName varchar(255) NOT NULL,
  PRIMARY KEY (categoryID),
  CONSTRAINT UNIQUE(categoryName)
);

--
-- Table structure for table `blockchains`
--
DROP TABLE IF EXISTS blockchains;

CREATE TABLE blockchains (
  blockchainID int(11) NOT NULL AUTO_INCREMENT,
  blockchainName varchar(255) NOT NULL,
  PRIMARY KEY (blockchainID),
  CONSTRAINT UNIQUE(blockchainName)
);

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  userID int(11) NOT NULL AUTO_INCREMENT,
  userName varchar(255) NOT NULL,
  isAdmin boolean default 0 NOT NULL,
  PRIMARY KEY (userID),
  CONSTRAINT UNIQUE(userName)
);

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS projects;

CREATE TABLE projects (
  projectID int(11) NOT NULL AUTO_INCREMENT,
  blockchainID int,
  categoryID int,
  projectName varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  inceptionDate int NOT NULL,
  marketCap bigint NOT NULL,
  FOREIGN KEY(blockchainID) REFERENCES blockchains(blockchainID),
  FOREIGN KEY(categoryID) REFERENCES categories(categoryID),
  PRIMARY KEY (projectID)
);

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS favorites;

CREATE TABLE favorites (
  userFavoriteID int(11) NOT NULL AUTO_INCREMENT,
  userID int(11),
  projectID int(11),
  FOREIGN KEY(userID) REFERENCES users(userID),
  FOREIGN KEY(projectID) REFERENCES projects(projectID),
  PRIMARY KEY (userFavoriteID)
);

-- Test that the tables were created
--DESCRIBE categories;
--DESCRIBE blockchains;
--DESCRIBE users;
--DESCRIBE projects;
--DESCRIBE favorites;


-- write your queries to insert data here
INSERT INTO categories(categoryName) VALUES ("Lending");
INSERT INTO categories(categoryName) VALUES ("Decentralized exchange");
INSERT INTO categories(categoryName) VALUES ("Asset Management");

INSERT INTO blockchains(blockchainName) VALUES ("Polygon");
INSERT INTO blockchains(blockchainName) VALUES ("Ethereum");
INSERT INTO blockchains(blockchainName) VALUES ("Binance Smart Chain");

INSERT INTO users(userName) VALUES ("Ryan",1);
INSERT INTO users(userName) VALUES ("Joey",1);
INSERT INTO users(userName) VALUES ("Vitalik",1);

INSERT INTO projects(blockchainID, categoryID, projectName, description, inceptionDate, marketCap )
VALUES((SELECT blockchainID from blockchains where blockchainName = "Ethereum"),
(SELECT categoryID from categories where categoryName = "Lending"),
"Aave", "Open Source & Non-Custodial protocol to earn interest on deposits and borrow assets",
"2017", 6845029959);

INSERT INTO projects(blockchainID, categoryID, projectName, description, inceptionDate, marketCap )
VALUES((SELECT blockchainID from blockchains where blockchainName = "Binance Smart Chain"),
(SELECT categoryID from categories where categoryName = "Decentralized exchange"),
"PancakeSwap", "Enables users to swap between cryptocurrency assets on a fast/inexpensive alternative to Ethereum",
"2017", 6845029959);

INSERT INTO projects(blockchainID, categoryID, projectName, description, inceptionDate, marketCap )
VALUES((SELECT blockchainID from blockchains where blockchainName = "Ethereum"),
(SELECT categoryID from categories where categoryName = "Asset Management"),
"Zapper", "Enables users to swap between cryptocurrency assets on a fast/inexpensive alternative to Ethereum",
"2017", 6845029959);


INSERT INTO favorites(userID, projectID)
VALUES((SELECT userID from users where userName = "Vitalik"),
(SELECT projectID from projects where projectName = "Aave"));

INSERT INTO favorites(userID, projectID)
VALUES((SELECT userID from users where userName = "Ryan"),
(SELECT projectID from projects where projectName = "PancakeSwap"));

INSERT INTO favorites(userID, projectID)
VALUES((SELECT userID from users where userName = "Joey"),
(SELECT projectID from projects where projectName = "Zapper"));