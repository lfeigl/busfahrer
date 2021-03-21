import { Server as SocketServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { log } from '../utils';
import * as events from './events';
import {
  Player,
  PlayerSocket,
  RoomCallback,
  GameCallback,
} from './types';

function handlePlayerSocketEvents(socket: Socket, player: Player): void {
  const playerSocket: PlayerSocket = Object.assign(socket, { player });

  socket.on('createRoom', (roomName: string, callback?: RoomCallback) => {
    events.createRoom(playerSocket, roomName, callback);
  });

  socket.on('joinRoom', (roomId: string, callback?: RoomCallback) => {
    events.joinRoom(playerSocket, roomId, callback);
  });

  socket.on('leaveRoom', (roomId: string, callback?: RoomCallback) => {
    events.leaveRoom(playerSocket, roomId, callback);
  });

  socket.on('startGame', (roomId: string, callback?: GameCallback) => {
    events.startGame(playerSocket, roomId, callback);
  });

  socket.on('disconnect', () => {
    if (playerSocket.player) {
      events.disconnect(playerSocket);
    }
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
