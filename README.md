<h2 align="center">
<p align="center"><img src="https://github.com/junwatu/telp/blob/main/articard.svg?raw=true" height="512px" alt="arti-card"></p>
<p align="center">Articard</p>
</h2>

Art history card 🃏

## Installation

## MongoDB

### Windows

```bash
mongod --port 27117 --dbpath=C:\MongoDB\data\db --bind_ip 0.0.0.0
```

## Redis

### Linux

````bash
$ redis-server

2195:C 27 Nov 2022 07:55:05.426 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
2195:C 27 Nov 2022 07:55:05.427 # Redis version=7.0.5, bits=64, commit=00000000, modified=0, pid=2195, just started
2195:C 27 Nov 2022 07:55:05.427 # Warning: no config file specified, using the default config. In order to specify a config file use ./redis-server /path/to/redis.conf
2195:M 27 Nov 2022 07:55:05.428 * Increased maximum number of open files to 10032 (it was originally set to 1024).
2195:M 27 Nov 2022 07:55:05.428 * monotonic clock: POSIX clock_gettime
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

## File Configuration

`.env`

```bash
ARTICARD_PORT=3113
ARTICARD_RIJKSMUSEUM_API_KEY=<api_key>
ARTICARD_RIJKSMUSEUM_USER_ID=<user_id>
ARTICARD_RIJKSMUSEUM_USERSET_NAME=<userset_name>
ARTICARD_RIJKSMUSEUM_BASE_USERSETS_URL=https://www.rijksmuseum.nl/api/en/usersets

ARTICARD_DATABASE_URL=<production_database_url>
ARTICARD_DATABASE_URL_DEV=mongodb://172.31.0.1:27117/telp

ARTICARD_HOST=localhost
```
