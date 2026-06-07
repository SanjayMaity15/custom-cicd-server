import express from "express";
import dotenv from "dotenv";
import { verifyGithubSignature } from "./utils/verifySignature.js";
import { deployBackend, deployFrontend } from "./service/deploy.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post("/webhook/github", (req, res) => {
	const valid = verifyGithubSignature(req);

	if (!valid) {
		return res.status(401).json({
			message: "Invalid signature",
		});
	}

	console.log("Signarure verified");

	res.status(200).json({
		message: "Webhook accepted",
	});

	const changedFiles =
		req.body.commits?.flatMap((commit) => [
			...(commit.added || []),
			...(commit.modified || []),
			...(commit.removed || []),
		]) || [];

	console.log(changedFiles);

	const frontendChanged = changedFiles.some((file) =>
		file.startsWith("client/"),
	);

	const backendChanged = changedFiles.some((file) =>
		file.startsWith("server/"),
	);

	if (frontendChanged && backendChanged) {
		deployFrontend();
		deployBackend();
	} else if (frontendChanged) {
		deployFrontend();
	} else if (backendChanged) {
		deployBackend();
	}

	console.log({ frontendChanged, backendChanged });
});

app.get("/", (req, res) => {
	res.send("CI CD SERVER IS RUNNING !!!");
});

app.listen(PORT, () => {
	console.log("SERVER IS RUNNING AT ", PORT);
});
