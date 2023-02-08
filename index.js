const express = require("express");
const bodyParser = require("body-parser");
const mongooser = require("mongoose");

const app = express();
const PORT = 8000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

// const databaseURL = "mongodb://localhost:27017/ussd";
// mongooser.connect(databaseURL, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });
// const db = mongooser.connection;

// db.on("error", console.error.bind(console, "connection error:"));

// db.once("open", () => {
// 	console.log("Database connected. Database is running on port 27017");
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Success Message");
});

app.post("/ussd", (req, res) => {
	// Read the variables sent via POST from our API
	const { sessionId, serviceCode, phoneNumber, text } = req.body;

	console.log(text);

	let response = "";

	if (text == "") {
		// This is the first request. Note how we start the response with CON
		response = `CON What would you like to check
        1. My account
        2. My phone number`;
	} else if (text == "1") {
		// Business logic for first level response
		response = `CON Choose account information you want to view
        1. Account number`;
	} else if (text == "2") {
		// Business logic for first level response
		// This is a terminal request. Note how we start the response with END
		response = `CON Your phone number is ${phoneNumber} \n 0. Main Menu`;
	} else if (text == "1*1") {
		// This is a second level response where the user selected 1 in the first instance
		const accountNumber = "ACC100101";
		// This is a terminal request. Note how we start the response with END
		response = `END Your account number is ${accountNumber}`;
	} else if (text === "1*2") {
		response = `END Your account balance is KES 10,000`;
	} else if (text === "2*0") {
		response = `CON Choose account information you want to view
		1. Account number
		2. Account balance`;
	} else {
		response = `END Invalid input`;
	}

	// Send the response back to the API
	res.set("Content-Type: text/plain");
	res.send(response);
});
