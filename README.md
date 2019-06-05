## sample-angular-app

1. Install Mongodb
`sudo apt install -y mongodb mongodb-server-core`

2. Build angular app
```
npm i
ng build
```

3. Run API / webserver

```
cd api
npm i
./node_modules/.bin/nodemon server
```

## Run

Method 1: Open browser http://localhost:4000 [this will go all to the API, including web serving]

Method 2:
```
ng serve
```
Open browser to http://localhost:4200 [this will proxy through angular's dev front end]

