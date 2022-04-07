import { Server } from "http";
import { config } from "../../config";
import { Server as SocketServer } from "socket.io";
import { SleepStatus, User } from "../../types";
import { AuthService } from "./auth.service";

export class AuthGateway {
	static io: SocketServer;
	//using socket.id for identification
	//TODO: use redis for this
	private static connectedClients: { id: string; user: User }[] = [];

	static createServer(server: Server) {
		this.io = new SocketServer(server, {
			cors: { origin: config.CLIENT_URL },
		});
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
			this.io.to(socket.id).emit("connectedusers", this.connectedClients);
			this.connectedClients.push({ id: socket.id, user });
			socket.broadcast.emit("newuser", { id: socket.id, user });

			socket.on("message", ({ message, user }: { message: string; user: string }) => {
				socket.broadcast.emit("message", { message, user });
			});

			socket.on("disconnect", () => {
				this.connectedClients = this.connectedClients.filter(
					(client) => client.id !== socket.id,
				);
				socket.broadcast.emit("logout", socket.id);
			});
		});
	}

	static broadcastStatus(status: SleepStatus, googleid: string) {
		this.io.emit("status", { googleid, status });
	}
}
