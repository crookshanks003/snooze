import { Server } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import { SleepStatus } from "src/types";
import { AuthService } from "./auth.service";

export class AuthGateway {
	static io: SocketServer;
	//just for the sake of it
	private static connectedClients: {[key: string]: Socket} = {};

	static createServer(server: Server) {
		this.io = new SocketServer(server);
		this.handleConnection();
	}

	static handleConnection() {
		this.io.on("connection", async (socket) => {
			const { googleid } = socket.handshake.headers;
			if (!googleid) {
				socket.disconnect();
				return;
			}
			if (typeof googleid !== "string") {
				socket.disconnect();
				return;
			}
			const user = await AuthService.findByGoogleId(googleid);
			if (!user) {
				socket.disconnect();
				return;
			}
			this.connectedClients[googleid] = socket;
		});
	}

	static broadcastStatus(status: SleepStatus, googleid: string){
		console.log("Sending status");
		this.io.emit("status", status);
	}
}