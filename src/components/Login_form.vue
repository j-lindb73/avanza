<template>
 
    <form 
        id="regform" 
        class="w3-container"
        @submit.prevent = "submitForm" >

    

    <label class="w3-text-blue"><b>Mailadress</b></label>
    <input class="w3-input w3-border" type="email" v-model="email">
    
    <label class="w3-text-blue"><b>Lösenord</b></label>
    <input class="w3-input w3-border" type="password" v-model="password">

    <button id="button-login" class="w3-btn w3-blue w3-margin w3-round-large">Logga in</button>
    <Auth/>
    </form>
 
</template>

<script>

import Auth from '../components/Auth';
import Vars from '../components/Vars';

export default {
    name: 'Login_form',
    data() {
        return {
            email: "",
            password: "",
        }
    },
    components: {
        Auth
    },
    methods: {
        submitForm: function() {
            // console.log({email: this.email,password: this.password});
            Auth.email = this.email;
            const requestOptions = {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                    })
            }
            // console.log(requestOptions);
            // fetch("http://localhost:1337/login", requestOptions)
            fetch(Vars.baseUrl + "/login", requestOptions)
            .then(function(response) {
                console.log(response);
                return response.json();
            })
            .then(function(result) {
                console.log(result);
                Auth.token = result.data.token;
                Auth.login;
                console.log(Auth.token);

            })
        }

    }
}
</script>
