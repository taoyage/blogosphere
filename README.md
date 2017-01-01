blogosphere
=================

Simple many people Blog example with Express, Xtpl, Mysql

This example covers following topics;

- `express`
- `mysql`
- `xtpl`
- `session`
- `routes`

Quick links ;

[mysql](https://github.com/mysqljs/mysql)
[express](https://github.com/expressjs/express)
[xtpl](https://github.com/xtemplate/xtpl)


## Getting Started

We'll be using an existing application that includes two models, several routes, and several views.

* Fork and clone this repository ` `
* Run `npm install` to install dependencies
  * Use `npm start` to start your application in development


* Setup your database (this app already has create mysql database file)
 * install Mysql
 	* copy blog.sql content code to create database

#### Read the Code

After setup, **STOP**. You're using an existing application, so make sure to read the code and ensure what the application does. Here is some information about the current setup.

* Routes
  * `GET /` - Render home page
  * `GET /account/login` - Get login page
  * `POST /account/login` - Process the login request
  * `GET /account/register` - Render reginster page
  * `POST /account/register` - Process the register request
  *	`GET /account/logout` - Process the logout request
  * `GET /article/publish` - Render publish article page
  * `POST /article/publish` - Render publish article page
  * `GET /article/details/:id` - Render detail article page
  *	`GET /article/page/:pageNum/:postAmount` Get home page article list 

* Models
  * `article model`
  *	`user model` 
  	* Use Constructor(class) encapsulation database operation models

## TODOS
- [x] Login
- [x] Register
- [x] Publish article 
- [x] Photo upload
- [ ] Edit article
- [ ] User personal homepage
- [ ] Optimization


