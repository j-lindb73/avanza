<template>
  <div class="w3-content" style="max-width:1400px">
    <Nav />

    <div class="small">
      <line-chart :chart-data="datacollection"  id="mychart"></line-chart>
    </div>
    <div class="w3-container w3-cell-row" >
       <div class="w3-cell" v-for="stock in stocks"  v-bind:key="stock.name" >
        <h2>
          <p class="w3-card">  {{ stock.name }}  </p>
        </h2>
        <h2>
          <p class="w3-card" > {{ Math.round(stock.course * 100) / 100 }}
          </p>
        </h2>
      </div>
    </div>

    <div class="w3-container w3-card w3-cell-row" v-if="checkIfToken() == true">
      <div class="w3-container w3-cell-row ">
      <div class="w3-cell" v-for="stock in stocks"  v-bind:key="stock.name" >
        <h5>
          <p class="w3-container" > 
            <a class="w3-button w3-round-xlarge w3-khaki w3-margin" href="buyStocks" @click.prevent="submitBuy({stockname:stock.name,price:stock.course,amount:1})">Köp 1</a>
            <a class="w3-button w3-round-xlarge w3-khaki" href="buyStocks" @click.prevent="submitBuy({stockname:stock.name,price:stock.course,amount:3})">Köp 3</a>
            <a class="w3-button w3-round-xlarge w3-khaki w3-margin" href="buyStocks" @click.prevent="submitBuy({stockname:stock.name,price:stock.course,amount:5})">Köp 5</a>
          </p>
        </h5>
      </div>
    </div>
      <div class="w3-container w3-half ">
        <h3>Likvida medel (SEK)</h3>
        <h4>
          {{ Math.round(user_money * 100) / 100 }}
        </h4>
        <form @submit.prevent = "toggle_money_transfer">
          <button class="w3-btn w3-round-xlarge w3-blue w3-margin">Sätt in pengar</button>
        </form>
        <div class=" w3-modal-content w3-animate-zoom w3-card-4 w3-light-gray" style="max-width:400px" v-if="money_transfer == true">
          <div class="modal-content">
            <header class="w3-container w3-khaki">
              <span v-on:click="toggle_money_transfer"
      class="w3-button w3-display-topright">&times;</span>
      <h2>Sätt in pengar</h2>
    </header>

            <form @submit.prevent = "depositMoney">
              <p>
                <input class="w3-container w3-input w3-center w3-xlarge" type=number v-model="user_deposit">
              </p>
              <p>
                <button class="w3-btn w3-blue w3-margin w3-round-xlarge">Skicka</button>
              </p>
            </form>
          </div>
        </div>
      </div>

      <div class="w3-container w3-half">
        <h3>Värdepapper</h3>
        <table class="w3-table">
          <tr>
            <th>
              Aktie
            </th>
            <th>
              Antal
            </th>
            <th>
              SEK
            </th>
            <th>
              
            </th>
          </tr>
          <tr v-for="stock in user_stocks" v-bind:key="stock.rowid">
            
              <td>
                {{ stock.stockname }}
              </td>
              <td>
                {{ stock.amount }}
              </td>
              <td>
                {{ Math.round(stock.price * 100) / 100 }}
              </td>
              <td>
                <a class="w3-btn w3-round w3-red w3-tiny " href="sellStocks" @click.prevent="sellStocks({name:stock.stockname,rowid:stock.rowid,amount:stock.amount})">Sälj</a>
              </td>
            </tr>     
        </table>
      </div>
    </div>
    <div class="w3-card" v-else>
      Logga in för att kolla innehav och göra affärer...
      <Loginform />
      </div>
    <Footer />
    <cookie-consent
      :cookie-expiry-days="-1"
    />
  </div>
</template>


<script>
import Nav from '@/components/Nav'
import Auth from '@/components/Auth'
import Loginform from '@/components/Login_form'
import Vars from '@/components/Vars';
import Footer from '@/views/Footer'
import LineChart from "../LineChart.js";
import io from "socket.io-client";
import CookieConsent from '@/components/CookieConsent';
// var socket = io.connect("http://localhost:1337");
var socket = io.connect(Vars.socketUrl);

export default {
  name: 'Me',
  props: { },
  components: {
    Nav,
    Footer,
    LineChart,
    Loginform,
    CookieConsent
  },
  data() {
    return {
      text: "",
      name: "",
      user_money: 0,
      user_deposit: 0,
      money_transfer: false,
      user_stocks: [],
      stocks: [],
      stock_to_buy: "",
      stock_amount: "",
      datacollection: null,
      type: 'line',
      realtimedata_old: [[0],[0]],
      realtimedata: [[],[]],
      labels: [],
      options: {
          scales: {
              yAxes: [{
                ticks: {
                  suggestedMin: 50,
                  suggestedMax: 100
                  }
              }],
              xAxes: [{
                type: 'time',
                time: {
                  unit: 'minute',
                  displayFormats: {
                  minute: 'h:mm a'
                }
              }
            }]
          }
      }
    };
  },
  created() {
    // this.getMe(),
    this.getRealtimeData()
    // this.getStocks()
  },
  methods: {
    checkIfToken: function() {
        // console.log({Token: Auth.token});
        if(Auth.token) {
          if (this.user_money == 0) {
            this.checkMoney();
          }
          if (this.user_stocks.length == 0) {
            this.getStocks();
          }
          return true;
        }
        return false;
    },
    getStocks: function() {
      var self = this;
      // console.log({email: Auth.email});
      // console.log({token: Auth.token});
      const requestOptions = {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'x-access-token': Auth.token
          },
          body: JSON.stringify({
              email: Auth.email
              })
      }
      console.log(requestOptions);
      fetch(Vars.baseUrl + "/stock", requestOptions)
      .then(function(response) {
          console.log(response);
              return response.json();
      })
      .then(function(result) {
          console.log(result.data);
          self.user_stocks = result.data;
          return result.data;
          // return "pelle";
      })
    },
    toggle_money_transfer: function() {
      return (this.money_transfer == false ? this.money_transfer = true : this.money_transfer = false);
      // return this.activate_money_transfer;
    },
    checkMoney: function() {
      var self = this;

      const requestOptions = {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'x-access-token': Auth.token
          },
          body: JSON.stringify({
              email: Auth.email
              })
      }
      // console.log(requestOptions);
      fetch(Vars.baseUrl + "/user", requestOptions)
      .then(function(response) {
          // console.log(response);
              return response.json();
      })
      .then(function(result) {
          console.log(result.data);
          self.user_money = result.data.balance;
          return result.data;
          // return "pelle";
      })
    },
    depositMoney() {
    let self=this;
    console.log(this.user_deposit);
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': Auth.token
      },
      body: JSON.stringify({
          email: Auth.email,
          money: this.user_deposit
          })
      }
      console.log(requestOptions);
      // fetch("http://localhost:1337/register", requestOptions)
      fetch(Vars.baseUrl + "/user/deposit", requestOptions)
      .then(function(response) {
          // console.log(response);
            return response.json();
      })
      .then(function() {
          // this.msg = result.data;
          // self.getStocks();
          // console.log(result);
          self.user_deposit = 0;
          self.toggle_money_transfer();
          self.checkMoney();
      })
    },
    sellStocks: function(item) {
        var self = this;
        // console.log({email: Auth.email});
        // console.log({token: Auth.token});
        console.log(item);
        let price = this.getStockPrice(item.name);
        let amount = item.amount;

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': Auth.token
            },
            body: JSON.stringify({
                email: Auth.email,
                userStockRowid: item.rowid,
                price: price,
                amount:amount
                })
        }
        console.log(requestOptions);
        fetch(Vars.baseUrl + "/stock/sell", requestOptions)
        .then(function(response) {
            console.log(response);
                return response.json();
        })
        .then(function(result) {
            console.log(result.data);
            self.stocks = result.data;
            self.getStocks();
            self.checkMoney();
            return result.data;
            // return "pelle";
        })
    },
    getStockPrice(stock_input) {
      console.log({"SI": stock_input});
      console.log({"STOCKS": this.stocks});
      let item = this.stocks.filter((stock) => stock.name == stock_input)
      console.log({"ITEM": item});
      return item[0].course;

    },
    submitBuy(purchase) {
      let self=this;
      
      console.log(purchase);
      const requestOptions = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': Auth.token
          },
          body: JSON.stringify({
              email: Auth.email,
              stockname: purchase.stockname,
              amount: purchase.amount,
              price: purchase.price
              })
      }
      console.log(requestOptions);
      // fetch("http://localhost:1337/register", requestOptions)
      fetch(Vars.baseUrl + "/stock/buy", requestOptions)
      .then(function(response) {
          console.log(response);
            return response.json();
      })
      .then(function(result) {
          // this.msg = result.data;
          // self.getStocks();
          console.log(result);
          self.getStocks();
          self.checkMoney();
      })
    },
    fillData(fetchedData) {
      // fetchedData = "bajs";
      // console.log("Här är fetcheddata");
      // console.log(fetchedData);
      this.datacollection = {
        labels: this.labels,
        datasets: [
          {
            label: "Hallonbåtar",
            backgroundColor: "#1A73E8",
            data: fetchedData[0]
            // data: [10,11,12]
          },
          {
            label: "Lakritssnören",
            backgroundColor: "#42b983",
            data: fetchedData[1]
            // data: [13,14,15]
          }
        ]
      };
    },
    getRealtimeData() {

      socket.on("newdata", fetchedData => {
        
        // console.log(fetchedData);
        this.stocks = fetchedData;

        this.labels.push(this.getTimestamp(fetchedData[0].timestamp));

        this.realtimedata[0].push(fetchedData[0].course);
        this.realtimedata[1].push(fetchedData[1].course);

        this.fillData(this.realtimedata) 

        if (this.labels.length > 15) {
          this.realtimedata[0].shift();
          this.realtimedata[1].shift();
          this.labels.shift();
        }

      })
    },
    updateStockprice(stock, price) {
      // console.log(stock);
      // this.stockprice[stock] = stock;
      this.stockprice[stock] = Math.round(price * 100) / 100;
    },
    getRandomChartValues(number){
      return Math.floor(Math.random() * number)
    },
    getTimestamp: function(timestamp) {
    const today = new Date(timestamp);

    // const date = today.getFullYear()+'/'+(today.getMonth()+1).toString().padStart(2,"0")+'/'+ today.getDate().toString().padStart(2,"0");
    const time = today.getHours().toString().padStart(2,"0") + ":" + today.getMinutes().toString().padStart(2,"0") + ":" + today.getSeconds().toString().padStart(2,"0");
    // const dateTime = date +' '+ time;
    const dateTime = time;
    return dateTime;
    },
    getDateTimestamp: function(timestamp) {
    const today = new Date(timestamp);

    const date = today.getFullYear()+'/'+(today.getMonth()+1).toString().padStart(2,"0")+'/'+ today.getDate().toString().padStart(2,"0");
    const time = today.getHours().toString().padStart(2,"0") + ":" + today.getMinutes().toString().padStart(2,"0") + ":" + today.getSeconds().toString().padStart(2,"0");
    const dateTime = date +' '+ time;
    // const dateTime = time;
    return dateTime;
    }
  }
}
</script>

<style scoped>
  article {
    text-align: left;
  }

  .small {
  max-width: 600px;
  margin: 10px auto;
}
.money_transfer {
  background-color: greenyellow;
  position: absolute;
  left: 40%;
  right: 40%;
  bottom: 10%;

    max-width: 300px;
    height: 250px;
    border: 1px solid black;
    border-radius: 10px;
}
.center {
  margin: 0 auto
}
</style>