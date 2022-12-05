<h2 align="center">
<p align="center"><img src="https://github.com/junwatu/articard/blob/main/articard.png?raw=true" height="500px" alt="arti-card"></p>
</h2>

# Articard

**Articard** is an art history card web application.

This is full-stack web application and I hope useful enough if you love art and history. This application is using data and API from [Rijksmuseum](https://data.rijksmuseum.nl/object-metadata/api/) so you should have `api key`, `username` and `userset`.

## Installation

This repository is monorepo and using MERN stack. That's means you need Node.js, MongoDB as database plus Redis as cache. 

### MongoDB

#### Windows

```bash
mongod --port 27117 --dbpath=C:\MongoDB\data\db --bind_ip 0.0.0.0
```

### Redis

#### Linux

````bash
$ redis-server

2195:C 27 Nov 2022 07:55:05.426 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
...
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 7.0.5 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 2195
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           https://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

2195:M 27 Nov 2022 07:55:05.434 # Server initialized

````

### File Configuration

You need to setup `.env` file within `srv` package and change any keys with your custom settings.

`.env`

```bash
TELP_PORT=3113
TELP_RIJKSMUSEUM_API_KEY=[USER_API_KEY]
TELP_RIJKSMUSEUM_USER_ID=[USER_ID]
TELP_RIJKSMUSEUM_USERSET_NAME=[USER_USERSET]
TELP_RIJKSMUSEUM_BASE_USERSETS_URL=https://www.rijksmuseum.nl/api/en/usersets
TELP_RIJKSMUSEUM_BASE_COLLECTION_URL=https://www.rijksmuseum.nl/api/en/collection

#mongodb address
TELP_DATABASE_URL_DEV=[mongodb://mongo-server:27017/telp] 
#redis address
TELP_REDIS_URL=[redis://redis-server:6379] 
# your domain
TELP_HOST=[https://junwatu-improved-space-waddle-pj7jwxv5j5367jv-3113.preview.app.github.dev] 
```

### Node.js

Install all application development dependencies

```bash

npm install
```

Run the application

```bash
npm run dev
```

Go to the browser and open `http://localhost:3113`

## Docker

COMING SOON

## License

[MIT](https://choosealicense.com/licenses/mit/)
