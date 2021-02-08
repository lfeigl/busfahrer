import { Server as SocketServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { log } from '../utils';
import * as events from './events';
import {
  PlayerSocket,
  Player,
} from './types';

function handlePlayerSocketEvents(socket: Socket, player: Player): void {
  const playerSocket: PlayerSocket = Object.assign(socket, { player });

  socket.on('createRoom', (roomName: string, callback?: Function) => {
    events.createRoom(playerSocket, roomName, callback);
  });

  socket.on('joinRoom', (roomId: string, callback?: Function) => {
    events.joinRoom(playerSocket, roomId, callback);
  });

  socket.on('leaveRoom', (roomId: string, callback?: Function) => {
    events.leaveRoom(playerSocket, roomId, callback);
  });
}

export default function attachSocketServer(server: HTTPServer): void {
  const io: SocketServer = new SocketServer(server);
  log('Socket server attached.');

  io.on('connection', (socket: Socket) => {
    socket.on('setPlayer', (player: Player) => {
      log(`Set player "${player.name}" (${player.id}).`);
      handlePlayerSocketEvents(socket, player);
    });
  });
}
