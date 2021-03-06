import { v4 as generateId } from 'uuid';
import { log } from '../utils';
import rooms from './rooms';
import * as socketUtils from './utils';
import {
  PlayerSocket,
  RoomCallback,
  Room,
} from './types';

export function leaveRoom(socket: PlayerSocket, roomId: string, callback?: RoomCallback): void {
  const { player } = socket;
  const room = rooms[roomId];

  if (room && room.players[player.id]) {
    socket.leave(roomId);
    delete room.players[player.id];
    log(`Player "${player.name}" (${player.id}) left room "${room.name}" (${roomId}).`);

    if (room.owner.id === player.id) {
      delete rooms[roomId];
      log(`Player "${player.name}" (${player.id}) was owner of room`,
        `"${room.name}" (${roomId}). Server removed room.`);
      socket.to(roomId).emit('roomRemoved');
    } else {
      socket.to(roomId).emit('playerLeftRoom', player);
    }

    if (callback) {
      callback(room);
    }
  }

  if (callback) {
    callback(null);
  }
}

export function createRoom(socket: PlayerSocket, roomName: string, callback?: RoomCallback): void {
  const { player } = socket;
  const room: Room = {
    id: generateId(),
    name: roomName,
    isOpen: true,
    owner: player,
    players: {},
  };

  socketUtils.cleanRooms();
  rooms[room.id] = room;
  log(`Player "${player.name}" (${player.id}) created room "${roomName}" (${room.id}).`);

  if (callback) {
    callback(room);
  }
}

export function joinRoom(socket: PlayerSocket, roomId: string, callback?: RoomCallback): void {
  const { player } = socket;
  const room = rooms[roomId];

  socketUtils.leaveJoinedRooms(socket, leaveRoom);

  if (room && room.isOpen) {
    socket.join(roomId);
    room.players[player.id] = {
      ...player,
      socketId: socket.id,
    };

    log(`Player "${player.name}" (${player.id}) joined room "${room.name}" (${roomId}).`);
    socket.to(roomId).emit('playerJoinedRoom', player);

    if (callback) {
      callback(room);
    }
  }

  if (callback) {
    callback(null);
  }
}

export function startGame(socket: PlayerSocket, roomId: string, callback?: RoomCallback): void {
  const { player } = socket;
  const room = rooms[roomId];

  if (room.owner.id === player.id) {
    room.isOpen = false;
  }

  log(`Game in room "${room.name}" (${roomId}) started.`);
  socket.to(roomId).emit('gameStarted', room);

  if (callback) {
    callback(room);
  }
}

export function disconnect(socket: PlayerSocket): void {
  socketUtils.leaveJoinedRooms(socket, leaveRoom);
}
