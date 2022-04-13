
CREATE TABLE `Categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Category_UN` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- magazine.ContentStatuses definition

CREATE TABLE `ContentStatuses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contentStatus` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ContentStatus_UN` (`contentStatus`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- magazine.Ratings definition

CREATE TABLE `Ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rating` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Rating_UN` (`rating`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- magazine.`Roles` definition

CREATE TABLE `Roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Role_UN` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- magazine.SubscriptionStatuses definition

CREATE TABLE `SubscriptionStatuses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subscriptionStatus` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SubscriptionStatus_UN` (`subscriptionStatus`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- magazine.`Users` definition

CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `token` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `idRole` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_UN` (`email`),
  KEY `User_FK` (`idRole`),
  CONSTRAINT `UserRole_FK` FOREIGN KEY (`idRole`) REFERENCES `Roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- magazine.Contents definition

CREATE TABLE `Contents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `free` tinyint(1) NOT NULL DEFAULT 1,
  `idCategory` bigint NOT NULL,
  `idRating` int NOT NULL,
  `idContentStatus` int NOT NULL,
  `idPublisher` int NOT NULL,
  `text` varchar(300) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ContentCategory_FK` (`idCategory`),
  KEY `ContentStatus_FK` (`idContentStatus`),
  KEY `ContentRating_FK` (`idRating`),
  KEY `ContentPublisher_FK` (`idPublisher`),
  CONSTRAINT `ContentCategory_FK` FOREIGN KEY (`idCategory`) REFERENCES `Categories` (`id`),
  CONSTRAINT `ContentStatus_FK` FOREIGN KEY (`idContentStatus`) REFERENCES `ContentStatuses` (`id`),
  CONSTRAINT `ContentRating_FK` FOREIGN KEY (`idRating`) REFERENCES `Ratings` (`id`),
  CONSTRAINT `ContentPublisher_FK` FOREIGN KEY (`idPublisher`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- magazine.Subscriptions definition

CREATE TABLE `Subscriptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idSubscriptionStatus` int NOT NULL,
  `idSubscriber` int NOT NULL,
  `idContent` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT NOW(),
  `updatedAt` datetime NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  KEY `SubscriptionSubscriber_FK` (`idSubscriber`),
  KEY `SubscriptionContent_FK` (`idContent`),
  CONSTRAINT `SubscriptionStatus_FK` FOREIGN KEY (`idSubscriptionStatus`) REFERENCES `SubscriptionStatuses` (`id`),
    CONSTRAINT `SubscriptionSubscriber_FK` FOREIGN KEY (`idSubscriber`) REFERENCES `Users` (`id`),
    CONSTRAINT `SubscriptionContent_FK` FOREIGN KEY (`idContent`) REFERENCES `Contents` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO magazine.Roles (role) VALUES
	 ('User'),
	 ('Subscriber'),
	 ('Publisher'),
	 ('Admin');	 
	 
INSERT INTO magazine.Categories (category) VALUES
	 ('Comedy'),
	 ('Drama'),
	 ('Fantasy'),
	 ('Action'),
 	 ('Horror'),
	 ('Mystery'),
	 ('Romance'),
	 ('Thriller'),
	 ('Western'),
	 ('Suspense');
	 
INSERT INTO magazine.ContentStatuses (contentStatus) VALUES
	 ('Deleted'),
	 ('Disabled'),
	 ('InProgress'),
	 ('Published');
	 
INSERT INTO magazine.Ratings (rating) VALUES
	 ('All'),
	 ('Mature'),
	 ('Teen');	 
	 
INSERT INTO magazine.SubscriptionStatuses (subscriptionStatus) VALUES
	 ('Allowed'),
	 ('Pending Payment');	 
	 
INSERT INTO magazine.`Users` (name,username,email,password,token,idRole) VALUES
	 ('Kevin Guerra','kevingnet','kevingnet@gmail.com','123456','123456',8),
	 ('kg2','kevingnet2','kevingnet2@gmail.com','abcabc','abcabc',6),
	 ('Invalid Dude','InvalidDude','invalid@invaliddns.org','000','000',5);
	 

	 
	 
	 
	 
