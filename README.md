# University Name

San Jose State University

# COURSE

Enterprise Software - CMPE172/ Fall 2020 

# Team Members

* Zefeng Qiu
* Kevin Luu
* Eager Yu

# Table Of Content

* [Projection Introduction](#Projection Introduction)
* [Sample Demo Screenshots](#Sample Demo Screenshots)
* [Folder structure](#Folder structure)
* [Install](#Install)
* [Diagram](#Diagram)



# Project Introduction

...

# Sample Demo Screenshots 

<img src="/Users/Zefeng/Desktop/172project/sjsu-cmpe172-team3/images/login.png" style="zoom:50%;" />



<img src="/Users/Zefeng/Desktop/172project/sjsu-cmpe172-team3/images/dashboard.png" style="zoom:50%;" />

<img src="/Users/Zefeng/Desktop/172project/sjsu-cmpe172-team3/images/product management.png" style="zoom:50%;" />

<img src="/Users/Zefeng/Desktop/172project/sjsu-cmpe172-team3/images/order form.png" style="zoom:50%;" />

<img src="/Users/Zefeng/Desktop/172project/sjsu-cmpe172-team3/images/manage users.png" style="zoom:50%;" />

<img src="/Users/Zefeng/Desktop/172project/sjsu-cmpe172-team3/images/authorize new users.png" style="zoom:50%;" />

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

  <img src="/Users/Zefeng/Desktop/172project/sjsu-cmpe172-team3/images/system architecture.png" style="zoom:50%;" />

* Class

  <img src="/Users/Zefeng/Desktop/172project/sjsu-cmpe172-team3/images/class.png" style="zoom:50%;" />

* sequence

  <img src="/Users/Zefeng/Desktop/172project/sjsu-cmpe172-team3/images/sequence diagram.png" style="zoom:50%;" />

* Db schema

  * user

    <img src="/Users/Zefeng/Desktop/172project/sjsu-cmpe172-team3/images/user.png" style="zoom:50%;" />

  * product

    <img src="/Users/Zefeng/Desktop/172project/sjsu-cmpe172-team3/images/product.png" style="zoom:50%;" />

  * order

    <img src="/Users/Zefeng/Desktop/172project/sjsu-cmpe172-team3/images/order.png" style="zoom:50%;" />