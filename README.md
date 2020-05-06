# Unoffical Chevrolte Auto shop.

This project is a simple web app with CRUD operations,
i used a HTML, CSS and JS for the front end, NodeJS in the back and MongoDB Atlas cloud for a NoSQL database system.
(images a stored in an S3 bucket just fot practice). You can see it live at my website tadela.net.


## Getting Started

### Prerequisites
In case you want to use it yourself you will need to prepare the following:

MongoDB account with:
Cluster named cluster1, a database named 'chevroletGarage' and 2 collections 'treatments' and 'users'.

You need to have the following installed:

1. Nodejs
2. NPM
3. Install the NodeJS dependencies via the following command:

```
npm install
```

Go to '.env_sample' update your password and user name to your MongoDB account and change the file name to '.env'.

and start
```
npm start
```

Home page
![Screenshot of home page](home.PNG)

Inserting a treatment page
![Screenshot of inserting a treatment page](insert.PNG)

Tabel page
![Screenshot of tabel page](table.PNG)
