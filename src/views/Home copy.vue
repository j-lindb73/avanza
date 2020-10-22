<template>
  <div class="w3-content" style="max-width:1400px">
    <Nav />

    <div class="small">
      <line-chart :chart-data="datacollection"  id="mychart"></line-chart>
    </div>
  <p v-for="stock in stocks"  v-bind:key="stock.name" >
    {{ stock.name }} - {{ Math.round(stock.course * 100) / 100 }}
  </p>

<form          class="w3-container"
        @submit.prevent = "submitBuy" >
<select v-model="stock_to_buy">
      >
  <option v-for="stock in stocks"  
        v-bind:key="stock.name"
        v-bind:value="{ name: stock.name, course: stock.course }">{{ stock.name }}
  </option>

</select>

    <button class="w3-btn w3-blue w3-margin">Köp</button>
</form>
  <form
          class="w3-container"
        @submit.prevent = "submitBuy" >
        

  
    <!-- <input type="text"  v-model=stock.buy> -->

  </form>
  <div>
   <stocks-prices stocks_now="här_skickas_data" />
 </div>

  <Stocks />
    <Footer />
  </div>
</template>


<script>
import Nav from '@/components/Nav'
// import Auth from '@/components/Auth'
import Stocks from '@/components/Stocks'
import Vars from '@/components/Vars';
import Footer from '@/views/Footer'
import LineChart from "../LineChart.js";
import io from "socket.io-client";
var socket = io.connect("http://localhost:1337");

export default {
  name: 'Me',
  props: { },
  components: {
    Nav,
    Footer,
    LineChart,
    Stocks,
    // NavSecure,
    // Auth
  },
  data() {
    return {
      text: "",
      name: "",
      stocks: [],
      email: "j@j.se",
      stock_to_buy: "",
      stock_amount: 10,
      // stockprice: [{name:"Hallonbåtar",course:"0"},{name:"Lakritssnören",course:"0"}],
      datacollection: null,
      type: 'line',
      realtimedata: [[0],[0]],
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
    this.getMe(),
    this.getRealtimeData()
    // this.getStocks()
  },
  methods: {
    getStockPrice(stock_input) {
      let chosen_stock = this.stocks.filter(() => this.stocks.name === stock_input)
      console.log(chosen_stock);
    },
    submitBuy() {
      console.log(this.stock_to_buy.course);
      const requestOptions = {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              email: this.email,
              stockname: this.stock_to_buy.name,
              amount: this.stock_amount,
              price:this.stock_to_buy.course
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
          console.log(result);
      })
    },
    getMe() {
      let that = this;
      // fetch("https://me-api.jsramverk.se")
      // fetch("http://localhost:1337")
      // fetch("https://me-api.hasselstigen.me")

      fetch(Vars.baseUrl)
      .then(function(response) {
        console.log(response);
          return response.json();
      })
      .then(function(result) {
        console.log(result);
          that.text = result.description;
          that.name = result.name;
      });
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
            backgroundColor: "#2b7518",
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
  margin: 150px auto;
}
</style>