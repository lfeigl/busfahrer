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
  players: Player[];
};

export type Rooms = {
  [id: string]: Room;
};

export type CreateRoomEventPayload = {
  player: Player;
  roomName: string;
};

export type JoinRoomEventPayload = {
  player: Player;
  roomId: string;
};
