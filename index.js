const express = require("express");
const app = express();

const port = 3000;

const fs = require("fs");
const path = require("path");


// 1) API End point to create a folder 

app.post('/create', async (req, res) => {

    try {
        fs.mkdir("Gayathri", (err, files) => {
            res.status(200).send("Folder created successfully")
        })
    } catch (err) {
        res.send("error creating folder", err)
    }
});



// 1) Write API End point which will create a file in a particular folder  

app.post('/write', async (req, res) => {

    try {
        let ts = Date.now();
        // timestamp in seconds
        let currentTimestamp = Math.floor(ts / 1000)

        let date_ob = new Date();

        // current date
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // current hours
        let hours = date_ob.getHours();

        // current minutes
        let minutes = date_ob.getMinutes();

        // current seconds
        let seconds = date_ob.getSeconds();

        let filepath = "./Gayathri" + "/" + year + "-" + month + "-" + date + "  " + hours + "." + minutes + "." + seconds + ".xls"


        fs.writeFile(filepath, `${currentTimestamp}`, { encoding: "utf8" }, (err) => {
            res.status(200).send("file created success")
        })

    } catch (err) {

        res.send("error in file creation")

    }

})



// 2) Write an API End point to retrieve all text filse in that particular folder 


app.get('/read', async (req, res) => {

    try {

        let filepath = "./Gayathri"
        const fileList = []

        fs.readdir(filepath, (err, files) => {

            files.forEach(file => {
                if (path.extname(file) == ".txt")
                    fileList.push(file)
            })
            res.status(200).send(fileList)

        });

    } catch (err) {

        res.send("error reading folder", err)

    }

});

app.listen(port, (error) => {
    if (!error)
        console.log(`server is successfully running on the port ${port}`)
    else
        console.log("Error occurred, server can't start", error);
}
);