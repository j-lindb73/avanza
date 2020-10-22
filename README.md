
# avanza

## Documentation

[Vue.js](vuejs.org) / [Vue CLI](https://cli.vuejs.org/) is used as framework

Realtime is implemeted by using [websockets](https://en.wikipedia.org/wiki/WebSocket) with npm-package [socket.io](https://socket.io).

For simulating course changes I took inspiration from  Emil Folino's [Simulate-Stock](https://github.com/emilfolino/simulate-stock)

To visualize stock prizes i used npm-package [vue-chart-js](https://vue-chartjs.org/)

Other realtime component is Chat which also saves posts to a document-database between sessions using [mongoDB](https://www.mongodb.com/)


## Project setup

Set up the environment and install dependencies

```
npm install
```

### Compiles and hot-reloads for development

Start development server. Saved changes a loaded on-the-fly.

```
npm run serve
```

### Compiles and minifies for production

Create production files.

```
npm run build
```

### Test for production

Run automated test for production.

```
npm test
```

If problems, run commands separately:

```
npm start
```
...and...
```
npm test-command
```


### Lints and fixes files

Check and fix files for/from lint errors.

```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
