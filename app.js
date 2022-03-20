const   express               = require("express"),
        app                   = express(),
        mongoose              = require("mongoose");
        bodyParser            = require("body-parser")
        lannisterRoutes       = require("./routes/lannister")

mongoose.connect("mongodb+srv://Yemi:Zelensky@cluster0.qi8lf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
app.use(bodyParser.json());
app.use(lannisterRoutes);
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.listen(process.env.PORT || 5000)