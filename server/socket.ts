import socketIO from 'socket.io';
import http from 'http';

export default function attachSocketServer(server: http.Server): void {
  const io = new socketIO.Server(server);
  console.log('Socket server attached.');
}
