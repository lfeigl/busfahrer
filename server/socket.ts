import { Server as SocketServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { v4 as generateId } from 'uuid';
import { log } from './utils';
import {
  Player,
  Players,
  Room,
  Rooms,
  CreateRoomEventPayload,
  JoinRoomEventPayload,
} from './types';

const players: Players = {};
const rooms: Rooms = {
  abc: {
    id: 'abc',
    name: 'TestRoom1',
    isOpen: true,
    owner: {
      id: 'A1',
      name: 'ROOT',
    },
    players: [],
  },
  xyz: {
    id: 'xyz',
    name: 'TestRoom2',
    isOpen: true,
    owner: {
      id: 'A1',
      name: 'ROOT',
    },
    players: [],
  },
};

function cleanRooms(): void {
  Object.keys(rooms).forEach((roomId: string) => {
    const room = rooms[roomId];

    if (!room.players.length) {
      delete rooms[roomId];
      log(`Server removed room "${room.name}" (${room.id}).`);
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
      players: [player],
    };

    cleanRooms();
    rooms[room.id] = room;
    socket.join(room.id);
    log(`Player "${player.name}" (${player.id}) created room "${roomName}" (${room.id}).`);
    callback(room);
  });

  socket.on('joinRoom', (payload: JoinRoomEventPayload, callback: Function) => {
    const { player, roomId } = payload;
    const room = rooms[roomId];

    if (room && room.isOpen) {
      if (!room.players.find((joinedPlayer: Player) => joinedPlayer.id === player.id)) {
        socket.join(roomId);
        room.players.push(player);
        log(`Player "${player.name}" (${player.id}) joined room "${room.name}" (${roomId}).`);
      }
    }

    callback(room);
  });

  socket.on('disconnect', () => {
    const playerId = Object.keys(players).find((id: string) => players[id].socketId === socket.id);

    if (playerId) {
      const player = players[playerId];
      delete players[playerId];
      log(`Server removed player "${player.name}" (${playerId}).`);
    }
  });
}

export default function attachSocketServer(server: HTTPServer): void {
  const io: SocketServer = new SocketServer(server);
  log('Socket server attached.');

  io.on('connection', (socket: Socket) => {
    socket.emit('getPlayer', (player: Player) => {
      players[player.id] = {
        ...player,
        socketId: socket.id,
      };

      log(`Server stored player "${player.name}" (${player.id}).`);
    });

    handleSocketEvents(socket);
  });
}
