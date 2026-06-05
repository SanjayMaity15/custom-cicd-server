import crypto from "crypto";

export function verifyGithubSignature(req) {
	const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;
	const signature = req.headers["x-hub-signature-256"];

	if (!signature) {
		return false;
    }
    console.log(req)

	const expectedSignature =
		"sha256=" +
		crypto
			.createHmac("sha256", WEBHOOK_SECRET)
			.update(JSON.stringify(req.rawBody))
			.digest("hex");

	return crypto.timingSafeEqual(
		Buffer.from(signature),
		Buffer.from(expectedSignature),
	);
}
