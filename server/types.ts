export type Player = {
  id: string;
  name: string;
  socketId?: string;
};

export type Players = {
  [id: string]: Player;
};

export type Room = {
  id: string;
  name: string;
  isOpen: boolean;
  owner: Player;
  players: Players;
};

export type Rooms = {
  [id: string]: Room;
};

export type CreateRoomEventPayload = {
  player: Player;
  roomName: string;
};

export type JoinLeaveRoomEventPayload = {
  player: Player;
  roomId: string;
};