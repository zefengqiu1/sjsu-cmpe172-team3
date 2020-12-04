# University Name

San Jose State University

# COURSE

Enterprise Software - CMPE172/ Fall 2020 

# Team Members

* Zefeng Qiu
* Kevin Luu
* Eager Yu

# Table of content

* [Projection Introduction](#Project-Introduction)
* [Sample Demo Screenshots](#Sample-Demo-Screenshots)
* [Folder structure](#Folder-structure)
* [Install](#Install)
* [Diagram](#Diagram)
* [License](#license)
* [Links](#links)



# Project Introduction

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/aimeos/aimeos-typo3/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/aimeos/aimeos-typo3/?branch=master)

:star: Star us on GitHub — it helps!

Inventory Manager is  ...



# Sample Demo Screenshots 

<img src="./images/login.png" style="zoom:50%;" />



<img src="./images/dashboard.png" style="zoom:50%;" />

<img src="./images/product management.png" style="zoom:50%;" />

<img src="./images/order form.png" style="zoom:50%;" />

<img src="./images/manage users.png" style="zoom:50%;" />

<img src="./images/authorize new users.png" style="zoom:50%;" />

# Folder structure

```java
.
├── README.md
├── Scripts
│   ├── Dockerfile
│   └── InventoryManager.sql
├── backend
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   └── src
├── frontend
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   └── src
└── images
    ├── authorize\ new\ users.png
    ├── dashboard.png
    ├── login.png
    ├── manage\ users.png
    ├── order\ form.png
    ├── product\ management.png
    └── sequence\ diagram.png
```

# Install

prerequisite:

Java jdk 8

install NPM (https://www.npmjs.com/get-npm)

mysql database > 8.0



Start backend:
run DemoApplication.java

Start frontend:
open new terminal
run following commnads to get started:
cd .\frontend\
cd .\app\
npm install(will take some time as it installs all the dependencies required by the application)
npm run start

# Diagram

* System Diagram

  <img src="./images/system architecture.png" style="zoom:50%;" />

* Class

  <img src="./images/class.png" style="zoom:50%;" />

* sequence

  <img src="./images/sequence diagram.png" style="zoom:50%;" />

* Db schema

  * user

    <img src="./images/user.png" style="zoom:50%;" />

  * product

    <img src="./images/product.png" style="zoom:50%;" />

  * order

    <img src="./images/order.png" style="zoom:50%;" />

## License

The Inventory Manager is licensed under the terms of the GPL Open Source
license and is available for free.

## Links

* [Web site](https://aimeos.org/integrations/typo3-shop-extension/)
* [Video](https://aimeos.org/docs/TYPO3)

