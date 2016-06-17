import * as express from "express";

const app = express();
app.use(function (request, response, next) {
    console.log(`${request.method}: ${request.path}`);
    next();
});

app.use(express.static("www"));
app.listen(3000, function () {
    console.log("Listening on port 3000");
});