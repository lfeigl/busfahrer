# Busfahrer
Online multiplayer in-browser implementation of the notorious German drinking game Busfahrer.

## Requirements
- [Node.js](https://nodejs.org)
- [pnpm](https://pnpm.io)

## Project setup
```
pnpm install
```


## Scripts

### Development

#### Compiles and hot-reloads the client in-memory for development
*Note: The backend will **not** be able to serve the frontend.*
```
pnpm serve
```

#### Compiles and hot-reloads the client on-disk for development
```
pnpm watch-client
```

#### Compiles and hot-reloads the server in-memory for development
```
pnpm watch-server
```

#### Lints files on clientside and serverside
```
pnpm lint
```

#### Lints files on clientside
```
pnpm lint-client
```

#### Lints files on serverside
```
pnpm lint-server
```


### Production

#### Compiles and minifies the client and the server for production
```
pnpm build
```

#### Compiles and minifies the client for production
```
pnpm build-client
```

#### Compiles and minifies the server for production
```
pnpm build-server
```

#### Starts the server for production
```
pnpm start
```


## Arguments
Server accepts following arguments:

Argument | Type | Description | Default value | Example usage
--- | --- | --- | --- | ---
`port` | `number` | Port on which the server listens. | `1337` | `pnpm start -- --port 3000`
`log` | `boolean` | Whether to keep a log file (`./busfahrer.log`) or not. | `false` | `pnpm start -- --log`

- *Production: `pnpm start`*
- *Development: `pnpm watch-server`*


## Socket events

### client to server
Event | Description | Parameters
--- | --- | ---
`setPlayer` | Set the player ID and name. *(mandatory for the following events)* | `player: Player`
`createRoom` | Create a room with a name. | `roomName: string, callback?: (room: Room) => void`
`joinRoom` | Join a room by its ID. | `roomId: string, callback?: (room: Room) => void`
`leaveRoom` | Leave a room by its ID. | `roomId: string, callback?: (room: Room) => void`
`startGame` | Start the game in a room. *(player needs to be owner of the room)* | `roomId: string, callback?: (playingCard: PlayingCard) => void`
`disconnect` | Client disconnected. *(automatically fired by Socket.IO)* | ---

### server to client
Event | Description | Parameters
--- | --- | ---
`playerJoinedRoom` | A player joined the room. | `player: Player`
`playerLeftRoom` | A player left the room. | `player: Player`
`roomRemoved` | The room was removed. | ---
`dealtHand` | The dealt hand for the player. | `hand: PlayingCard[]`
`flippedFirCard` | The flipped fir card. | `firCard: PlayingCard`


## Credits
- Custom "Busfahrer" logo by [Hamzah Qazi](https://twitter.com/qazi_hamzah) ([hqxdesigns](https://www.instagram.com/hqxdesigns) / [Souel Studios](https://www.instagram.com/souel.studios))
- Free SVG playing cards by [Adrian Kennard (RevK®)](https://www.me.uk/cards)
