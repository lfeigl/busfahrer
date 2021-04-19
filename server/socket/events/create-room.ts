import { v4 as generateId } from 'uuid';
import rooms from '../rooms';
import * as socketUtils from '../utils';
import { log } from '../../utils';
import {
  PlayerSocket,
  Room,
  RoomCallback,
} from '../types';

export default (socket: PlayerSocket, roomName: string, callback?: RoomCallback): void => {
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
};
