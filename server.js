const express = require("express")
const dotenv = require("dotenv")
var path = require('path')
const logger = require("./middleWares/logger")
const morgan = require("morgan")
var rfs = require('rotating-file-stream')
const connectDB = require("./config/db")
const errorHandler = require ("./middleWares/error")



dotenv.config({path: "./config/config.env"})
const app = express();
connectDB()

const userRoute = require("./routes/userRoute")
const categoryRoute = require("./routes/categoryRoute")
const orgRoute=require("./routes/orgRoute")
const exhibitRoute = require("./routes/exhibitRoute")

var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})

app.use(express.json()) 
app.use(logger);
app.use(morgan('combined', { stream: accessLogStream }))

app.use("/user", userRoute);
app.use("/category", categoryRoute)
app.use("/organisation", orgRoute)
app.use("/exhibit",exhibitRoute)

app.use(errorHandler); 

app.listen(process.env.PORT, 
    console.log(`Server ${process.env.PORT} port aslaa`))

process.on("unhandledRejection", (err, promise)=>{
    console.log(`Алдаа гарлаа: " ${err.message}`.underline.red.bold)
    server.close(()=>{
        process.exit(1)
    })
});