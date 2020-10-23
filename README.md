[![Build Status](https://travis-ci.org/j-lindb73/avanza.svg?branch=master)](https://travis-ci.org/github/j-lindb73/avanza)
[![Build Status](https://scrutinizer-ci.com/g/j-lindb73/avanza/badges/build.png?b=master)](https://scrutinizer-ci.com/g/j-lindb73/avanza/build-status/master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/j-lindb73/avanza/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/j-lindb73/avanza/?branch=master)

# avanza

### Project Background

This is the frontend part of the final project in course js-ramverk which is given at Blekinge Tekniska Högskola (BTH) autumn of 2020.

It can visualise users registration/login, stock purchasing/selling/course variations and chat between users via websockets.

## Documentation

[Vue.js](vuejs.org) / [Vue CLI](https://cli.vuejs.org/) is used as framework

Realtime is implemeted by using [websockets](https://en.wikipedia.org/wiki/WebSocket) with npm-package ```socket.io-client``` which is part of [socket.io](https://socket.io).
Other realtime component is Chat which uses backend server components via routes to save posts between sessions.

For simulating course changes I took inspiration from  Emil Folino's [Simulate-Stock](https://github.com/emilfolino/simulate-stock)

To visualize stock prizes i used basic functions in npm-package [vue-chart-js](https://vue-chartjs.org/).

### 'Krav 3: Realtid' in project specifications, in swedish)
Jag använde simulate-prices för inspiration och skapade 2 aktier (Hallonbåtar och Lakritssnören) som har varierande kurs. 
Ny kurs genereras var 5:e sekund via backend ohc plockas upp i frontend för att presenteras grafiskt och i text. Detta syns även då användaren är i icke inloggat läge. 
I inloggat läge används aktuell kurs vid köp och försäljning av aktieposter. 
Jag valde också att implemetera chat-funktionen (från tidigare kursmoment). Tidigare var det en fristående tjänst men nu bakade jag inte den tillsammans med övriga 
funktioner i backend.

Överlag är jag nöjd men mitt val av teknik har en liten bieffekt som jag inte lagt tillräckligt med tid för att lösa än. När jag genomför en försäljning av aktier hämtar jag aktuell kurs på vald aktie. Det påverkar visningen av aktierna och aktuell kurs ända tills en kursuppdatering anländer. 

### 'Krav 5: Tester frontend' in project specifications, in swedish)

**Test 1**
Test av förstasidan, att det är rätt rubrik, url och att det finns en Logga in-knapp.

**Test 2**
Test av Chat-sidan, att det är rätt rubrik och url.

**Test 3-5**
Test av Admin-sidan, att det är rätt rubrik, url och att det finns en Registrera-knapp.
Tryck på Logga in i under-menyn: Test av Loggain-sidan, att det är rätt rubrik, url och att det finns en Logga in-knapp.
Tryck på Registrera användare i under-menyn: Test av registrera användare-sidan, att det är rätt rubrik, url och att det finns en Registrera-knapp.


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
