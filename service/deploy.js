import { spawn } from "child_process";



export function deployBackend() {

    const BACKEND_SERVER_IP = process.env.BACKEND_SERVER_IP;

	const child = spawn("ssh", [
		`ubuntu@${BACKEND_SERVER_IP}`,
		"/home/ubuntu/deploy-backend.sh",
	]);

	child.stdout.on("data", (data) => {
		console.log("[BACKEND]", data.toString());
	});

	child.stderr.on("data", (data) => {
		console.error("[BACKEND ERROR]", data.toString());
	});

	child.on("close", (code) => {
		console.log("Backend deployment finished:", code);
	});
}

export function deployFrontend() {

    const BACKEND_SERVER_IP = process.env.BACKEND_SERVER_IP;

	const child = spawn("ssh", [
		`ubuntu@${BACKEND_SERVER_IP}`,
		"/home/ubuntu/deploy-frontend.sh",
	]);

	child.stdout.on("data", (data) => {
		console.log("[FRONTEND]", data.toString());
	});

	child.stderr.on("data", (data) => {
		console.error("[FRONTEND ERROR]", data.toString());
	});

	child.on("close", (code) => {
		console.log("Frontend deployment finished:", code);
	});
}
