# busfahrer

## Project setup
```
npm install
```


## Scripts

### Development

#### Compiles and hot-reloads the client in-memory for development
```
npm run serve
```

#### Compiles and hot-reloads the client for development
```
npm run watch-client
```

#### Compiles and hot-reloads the server for development
```
npm run watch-server
```

#### Lints files on clientside and serverside
```
npm run lint
```

#### Lints files on clientside
```
npm run lint-client
```

#### Lints files on serverside
```
npm run lint-server
```


### Production

#### Compiles and minifies the client and the server for production
```
npm run build
```

#### Compiles and minifies the client for production
```
npm run build-client
```

#### Compiles and minifies the server for production
```
npm run build-server
```

#### Starts the server for production
```
npm start
```


## Arguments

Server accepts following arguments:

Argument | Type | Description | Default value | Example usage
--- | --- | --- | --- | ---
`port` | `number` | Port on which the server listens. | `1337` | `npm start -- --port 3000`
`log` | `boolean` | Whether to keep a log file (`./busfahrer.log`) or not. | `false` | `npm start -- --log`

- *Production: `npm start`*
- *Development: `npm run watch-server`*
