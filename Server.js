const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'profilePics')
    },
    filename: (request, file, cb) => {
        console.log(file)

        cb(null, `${Date.now()}_${file.originalname}`);
    }
})

const upload = multer({ storage: storage })


let app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded());

app.use('/profilePics', express.static('profilePics'));
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*",(req,res)=>{
    res.sendFile("./client/build/index.html");
})


app.post("/signup", upload.single("profilePic"), async (request, res) => {

    console.log(request.file);


    try {
        let signedUpUser = new User({
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            age: request.body.age,
            email: request.body.email,
            password: request.body.password,
            mobileNo: request.body.mobileNo,
            profilePic: request.file.path,
        });

        await signedUpUser.save();

        res.json({ status: "success", msg: "Created account sucessfully." })


    } catch (err) {
        res.json({ status: "failure", msg: "Unable to create account." })
    }

});

app.post("/login", upload.none(), async (request, res) => {
    console.log(request.body);


    let userData = await User.find().and({ email: request.body.email })

    console.log(userData)
    if (userData.length > 0) {

        if (userData[0].password == request.body.password) {

            let userDetailsToSend = {
                firstName: userData[0].firstName,
                lastName: userData[0].lastName,
                age: userData[0].age,
                email: userData[0].email,
                mobileNo: userData[0].mobileNo,
                profilePic: userData[0].profilePic
            }

            res.json({ status: "Success", data: userDetailsToSend, msg: "Email and Password are correct." });

        } else {
            res.json({ status: "failure", msg: "Invalid password." })
        }

    } else {
        res.json({ status: "failure", msg: "User does not exist." })
    }

})

app.listen(7036, () => {
    console.log("Listening to port 7036 ");
})


let userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    password: String,
    mobileNo: String,
    profilePic: String
});
let User = new mongoose.model("user", userSchema, "users");



let connectToMDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://khasimsaheb7036:shaik@clusterkhasim.yn9eicx.mongodb.net/NewDb")
        console.log("successfully connected to MDB");

    } catch (err) {
        console.log(err)
        console.log("unable to connect MDB")
    }
}
connectToMDB();


