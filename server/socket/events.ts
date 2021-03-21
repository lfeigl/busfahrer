import { v4 as generateId } from 'uuid';
import { log } from '../utils';
import rooms from './rooms';
import * as socketUtils from './utils';
import * as gameUtils from '../game/utils';
import getFullDeck from '../game/deck';
import {
  Room,
  PlayerSocket,
  RoomCallback,
  GameCallback,
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
    deck: [],
    firCards: [],
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

export function startGame(socket: PlayerSocket, roomId: string, callback?: GameCallback): void {
  const { player } = socket;
  const room = rooms[roomId];

  if (room.owner.id === player.id) {
    const playerCount = Object.keys(room.players).length;
    const deck = getFullDeck();

    room.isOpen = false;
    room.deck = gameUtils.shuffleDeck(deck);
    room.firCards = room.deck.splice(0, 15);
    room.currentFirCard = room.firCards.pop();

    const dealtCards = gameUtils.dealCards(room.deck, playerCount);

    Object.values(room.players).forEach((coPlayer) => {
      if (coPlayer.socketId) {
        const hand = dealtCards.pop();

        coPlayer.hand = hand;

        if (coPlayer.id === player.id) {
          socket.emit('dealtHand', hand);
        } else {
          socket.to(coPlayer.socketId).emit('dealtHand', hand);
        }
      }
    });

    socket.to(roomId).emit('flippedFirCard', room.currentFirCard);
    log(`Game in room "${room.name}" (${roomId}) started.`);
    socket.to(roomId).emit('gameStarted');

    if (callback) {
      callback(room.currentFirCard);
    }
  }

  if (callback) {
    callback(null);
  }
}

export function disconnect(socket: PlayerSocket): void {
  socketUtils.leaveJoinedRooms(socket, leaveRoom);
}
