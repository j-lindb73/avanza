<template>
 <div class="w3-container">
      <div id='stocks-prices'>
   {{stocks_now}}
 </div>
     <form @submit.prevent = "getStocks">

     <button class="w3-btn w3-blue w3-margin">Kolla aktier</button>
     </form>

    <p v-for="stock in stocks" v-bind:key="stock.rowid">
       {{ stock.stockname }}   {{ stock.amount }} <a href="sellStocks" @click.prevent="sellStocks({name:stock.stockname,rowid:stock.rowid})">Sälj</a>
     </p>
 </div>
</template>

<script>

import Auth from '@/components/Auth';
import Home from '@/views/Home';
import Vars from '@/components/Vars'

export default {
    name: 'Get_stocks',
    data() {
        return {
            stocks: ""
        }
    },
    props: ['stocks_now'],
    created() {
        // this.stocks = "pelle";
        this.stocks = this.getStocks(Auth.email);
        // this.getRealtimeData()
  },
    methods: {
    getStocks: function() {
        var self = this;
        console.log({email: Auth.email});
        console.log({token: Auth.token});
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
            self.stocks = result.data;
            return result.data;
            // return "pelle";
        })

    },
    sellStocks1(item) {
        console.log(item)
    },
    sellStocks: function(item) {
        Home.getStockPrice(item.name);
        var self = this;
        console.log({email: Auth.email});
        console.log({token: Auth.token});

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': Auth.token
            },
            body: JSON.stringify({
                email: Auth.email,
                user_stock_rowid: item.rowid
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
            return result.data;
            // return "pelle";
        })
    }
}

}
</script>
