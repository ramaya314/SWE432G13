var mongoose = require("mongoose");

function onConnectionError(error) {
    console.log(`Mongo onnection error: ${error}`);
}

async function connect(connectionString) {
    try{
        await mongoose.connect(connectionString);
        console.log('mongodb connected');
    } catch (e) {
        onConnectionError(e);
    }
    const connection = mongoose.connection;
    connection.on("error", onConnectionError);
    connection.once("open", () => console.log("Connected to DB!"));
}

async function connectWithAuth() {
    const dbUser = process.env.DB_USER
    const dbPass = process.env.DB_PASS
    const dbIp = process.env.DB_IP
    const dbName = process.env.DB_NAME

    await mongoose.connect(
        `mongodb://${dbIp}/${dbName}`,
        {
            authSource: "admin",
            user: `${dbUser}`,
            pass: `${dbPass}`
        }
    )

    const connection = mongoose.connection;
    connection.on("error", onConnectionError);
    connection.once("open", () => console.log("Connected to DB!"));
}

module.exports = {
    connect: connect,
    connectWithAuth: connectWithAuth
}