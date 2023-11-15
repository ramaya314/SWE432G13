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

module.exports = connect;