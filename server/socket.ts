import { Server as SocketServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { v4 as generateId } from 'uuid';
import { log } from './utils';
import {
  PlayerSocket,
  Player,
  Room,
  Rooms,
  CreateRoomPayload,
  JoinLeaveRoomPayload,
} from './types';

const rooms: Rooms = {};

function cleanRooms(): void {
  Object.keys(rooms).forEach((roomId: string) => {
    const room = rooms[roomId];

    if (!Object.keys(room.players).length) {
      delete rooms[roomId];
      log(`Server removed empty room "${room.name}" (${room.id}).`);
    }
  });
}

function leaveRoom(socket: PlayerSocket, roomId: string, callback?: Function): void {
  const { player } = socket;
  const room = rooms[roomId];

  if (room) {
    socket.leave(roomId);
    delete room.players[player.id];
    log(`Player "${player.name}" (${player.id}) left room "${room.name}" (${roomId}).`);

    if (room.owner.id === player.id) {
      delete rooms[roomId];
      log(`Player "${player.name}" (${player.id}) was owner of room`,
        `"${room.name}" (${roomId}). Server removed room.`);
      socket.to(roomId).emit('ownerLeftRoom');
    } else {
      socket.to(roomId).emit('playerLeftRoom', player);
    }
  }

  if (callback) {
    callback(room);
  }
}

function leaveJoinedRooms(socket: PlayerSocket): void {
  const { player } = socket;

  Object.keys(rooms).forEach((roomId: string) => {
    if (Object.keys(rooms[roomId].players).includes(player.id)) {
      leaveRoom(socket, roomId);
    }
  });
}

function createRoom(socket: PlayerSocket, roomName: string, callback?: Function): void {
  const { player } = socket;
  const room: Room = {
    id: generateId(),
    name: roomName,
    isOpen: true,
    owner: player,
    players: {},
  };

  cleanRooms();
  rooms[room.id] = room;
  log(`Player "${player.name}" (${player.id}) created room "${roomName}" (${room.id}).`);

  if (callback) {
    callback(room);
  }
}

function handlePlayerSocketEvents(socket: Socket, _player: Player): void {
  const playerSocket: PlayerSocket = Object.assign(socket, { player: _player });

  playerSocket.on('createRoom', (payload: CreateRoomPayload, callback: Function) => {
    const { roomName } = payload;
    createRoom(playerSocket, roomName, callback);
  });

  playerSocket.on('joinRoom', (payload: JoinLeaveRoomPayload, callback: Function) => {
    const { player, roomId } = payload;
    const room = rooms[roomId];

    leaveJoinedRooms(playerSocket);

    if (room && room.isOpen) {
      socket.join(roomId);
      room.players[player.id] = {
        ...player,
        socketId: socket.id,
      };

      log(`Player "${player.name}" (${player.id}) joined room "${room.name}" (${roomId}).`);
      socket.to(roomId).emit('playerJoinedRoom', player);
    }

    callback(room);
  });

  playerSocket.on('leaveRoom', (payload: JoinLeaveRoomPayload, callback: Function) => {
    const { roomId } = payload;
    leaveRoom(playerSocket, roomId, callback);
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
