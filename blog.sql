/*
* @Author: taoyage
* @Date:   2016-12-20 23:15:13
* @Last Modified by:   taoyage
* @Last Modified time: 2016-12-20 23:31:41
*/

CREATE DATABASE IF NOT EXISTS blogosphere;

use blogosphere;

CREATE TABLE users(
	id INT PRIMARY KEY auto_increment,
	username VARCHAR(20) NOT NULL,
	password VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL
);

CREATE TABLE articles(
	id INT PRIMARY KEY auto_increment,
	title VARCHAR(100) NOT NULL,
	content TEXT NOT NULL,
	time DATETIME NOT NULL,
	uid INT NOT NULL
);

CREATE TABLE comments(
	id INT PRIMARY KEY auto_increment,
	content TEXT NOT NULL,
	time DATETIME NOT NULL,
	uid INT NOT NULL,
	aid INT NOT NULL
);