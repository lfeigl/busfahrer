import { Server as SocketServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { v4 as generateId } from 'uuid';
import { log } from './utils';
import {
  Room,
  Rooms,
  CreateRoomEventPayload,
  JoinLeaveRoomEventPayload,
} from './types';

const rooms: Rooms = {};

function cleanRooms(): void {
  Object.keys(rooms).forEach((roomId: string) => {
    const room = rooms[roomId];

    if (!room.players.length) {
      delete rooms[roomId];
      log(`Server removed empty room "${room.name}" (${room.id}).`);
    }
  });
}

function handleSocketEvents(socket: Socket): void {
  socket.on('createRoom', (payload: CreateRoomEventPayload, callback: Function) => {
    const { player, roomName } = payload;
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
    callback(room);
  });

  socket.on('joinRoom', (payload: JoinLeaveRoomEventPayload, callback: Function) => {
    const { player, roomId } = payload;
    const room = rooms[roomId];

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

  socket.on('leaveRoom', (payload: JoinLeaveRoomEventPayload, callback: Function) => {
    const { player, roomId } = payload;
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

    callback(room);
  });
}

export default function attachSocketServer(server: HTTPServer): void {
  const io: SocketServer = new SocketServer(server);
  log('Socket server attached.');

  io.on('connection', (socket: Socket) => {
    handleSocketEvents(socket);
  });
}
