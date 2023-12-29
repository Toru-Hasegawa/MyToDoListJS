// メモ書き
if (process.env.NODE_ENV != "production") {
    require("dotenv").config({
        path: `${__dirname}/.env`
    });
}

const express = require("express");
const path = require("path");
const middleware = require("./middleware/middleware");
const errorHandlingMiddleware = require("./middleware/error-handling");
const PORT = process.env.PORT || 9000;

// Controllers
const UsersController = require("./controllers/users-controller");
const ToDosController = require('./controllers/todos-controller');

const app = express();
const clientRoot = path.resolve(__dirname, "..", "/client/dist/packet-app-service");

middleware(app, clientRoot);

app.use("/api/users", UsersController);
app.use("/api/todos", ToDosController);

app.get("/", (req, res) => {
    res.sendFile(path.join(clientRoot, "index.html"));
});

errorHandlingMiddleware(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
