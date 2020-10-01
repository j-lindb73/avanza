<template>
  <div class="w3-content" style="max-width:1400px">
    <Nav />
  
    <article class="w3-animate-opacity w3-card-4">
        
      <h3>Chat</h3>
      <div class="w3-container" v-show="state == 0">
        <h4>Välkommen! Skriv gärna ditt användarnamn.</h4>
        <form class="w3-container w3-padding-48" @submit.prevent="setUsername">
            <input class="w3-margin" type="text" placeholder="Vem är du?" v-model="username" />
            <input  type="submit" value="Börja tjöta..." />
        </form>
      </div>
      <div class="w3-container" v-show="state == 1">

        <ul class="w3-ul" id="chatbox">
            <li v-for="(message, index) in messages" :key="index"
                class="w3-container" :class="{ 
                    'message-out': message.user === username, 
                    'message-in': message.user !==  username }">
                <i>{{ getTimestamp(message.timestamp) }}</i><br/> <b> {{ message.user }}</b> {{ message.message}}
            </li>
        </ul>
        <form class="w3-container w3-padding-48" @submit.prevent="sendMessage">
                <input type="text" placeholder="Meddelande..." v-model="message" />
                <input type="submit" value="Skicka" />

        </form>
      </div>
    </article>

    <Footer />
  </div>
</template>

<script>
let socket = null;

import Nav from '@/components/Nav'
// import Vars from '@/components/Vars';
import Footer from '@/views/Footer'
import io from 'socket.io-client';

export default {
  name: 'Chat',
  props: { },
  components: {
    Nav,
    Footer,
  },
  data: function() {
      return    {
        message: '',
        messages: [],
        username: null,
        state: 0
    } 
  },
  created: function () {
    // socket = io('localhost:3000');
    socket = io('https://socket-server.hasselstigen.me');
  },
  mounted: function() {
      var self = this;
      socket.on('message', function(msg) {
          self.messages.push(msg);
      })
      this.scrollToEnd();
  },
  updated: function() {
      this.scrollToEnd();
  },
  methods: {
    sendMessage: function() {
        socket.emit('message', this.message);
        // this.scrollToEnd();
        this.message =  '';
    },
    scrollToEnd: function() {    	
    var chatbox = this.$el.querySelector("#chatbox");
    if (chatbox) {
        chatbox.scrollTop = chatbox.scrollHeight;
    }
    },
    setUsername: function() {
        // if (this.username === '') {
        //     this.username = 'Gäst';
        // }
        if (this.username == null) {
            this.username = `Gäst${Math.floor(Math.random() * 1000000)}`;
        }

        socket.emit('join', this.username);
        // this.username= '';
        this.state = 1;
    },
    getTimestamp: function(timestamp) {
        const today = new Date(timestamp);

        const date = today.getFullYear()+'/'+(today.getMonth()+1).toString().padStart(2,"0")+'/'+ today.getDate().toString().padStart(2,"0");
        const time = today.getHours().toString().padStart(2,"0") + ":" + today.getMinutes().toString().padStart(2,"0") + ":" + today.getSeconds().toString().padStart(2,"0");
        const dateTime = date +' '+ time;
        return dateTime;
    }
  }
}
</script>

<style scoped>
    #chatbox {
        height: 250px;
        max-width: 400px;
        overflow-y: scroll;
        margin: auto;
    }

    .message-out {
        background-color: #4CAF50;
        text-align: right;
        border-radius: 15px;
    }
 
    .message-in {
        background-color: #F1F1F1;
        text-align: left;
    }
</style>