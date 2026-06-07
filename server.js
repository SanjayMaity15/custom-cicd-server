import express from "express"
import dotenv from "dotenv"
import { verifyGithubSignature } from "./utils/verifySignature.js"

dotenv.config()
const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())


app.post("/webhook/github", (req, res) => {
	const valid = verifyGithubSignature(req);

	if (!valid) {
		return res.status(401).json({
			message: "Invalid signature",
		});
	}

	console.log("Verified GitHub webhook");

	const frontendChanged = req.body.commits.modified.some((file) => file.startsWith("frontend/"))

	const backendChanged = req.body.commits.modified.some((file) => file.startsWith("backend/"))

	console.log({frontendChanged, backendChanged})

	res.status(200).json({
		message: "Webhook accepted",
    });

});

app.get("/", (req, res) => {
    res.send("CI CD SERVER IS RUNNING !!!")
})

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING AT ", PORT)
})  