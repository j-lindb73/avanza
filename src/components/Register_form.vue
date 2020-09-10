<template>
    <div class="form">
        <div class="w3-panel w3-blue"  v-if="msg">
  <h3>Information!</h3>
  <p>{{ msg }}</p>
</div> 
    <form 
        id="regform" 
        class="w3-container "
        @submit.prevent = "submitForm" >


    <label class="w3-text-blue"><b>Mailadress</b></label>
    <input class="w3-input w3-border" type="email" v-model="email">
    
    <label class="w3-text-blue"><b>Lösenord</b></label>
    <input class="w3-input w3-border" type="password" v-model="password">

    <button class="w3-btn w3-blue w3-margin">Registrera</button>
 
    </form>
    </div>
</template>

<script>
export default {
    name: 'Register_form',
    data() {
        return {
            email: "",
            password: "",
            msg: ""
        }
    },
    methods: {
        submitForm: function() {
            console.log({email: this.email,password: this.password});
            const requestOptions = {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                    })
            }
            console.log(requestOptions);
            fetch("http://localhost:1337/register", requestOptions)
            .then(function(response) {
                console.log(response);
                 return response.json();
            })
            .then(function(result) {
                this.msg = result.data;
                console.log(result);
            })
        }

    }
}
</script>

