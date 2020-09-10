<template>
 
    <form 
        id="regform" 
        class="w3-container"
        @submit.prevent = "submitForm" >

    

    <label class="w3-text-blue"><b>Vecka</b></label>
    <input class="w3-input w3-border" type="text" v-model="week">
    
    <label class="w3-text-blue"><b>Text</b></label>
    <textarea class="w3-input w3-border" type="text" v-model="text"></textarea>

    <button class="w3-btn w3-blue w3-margin">Skapa</button>
 
    </form>
 
</template>

<script>

import Auth from '@/components/Auth';
export default {
    name: 'Report_form',
    data() {
        return {
            week: "",
            text: ""
        }
    },
    methods: {
        submitForm: function() {
            console.log({week: this.week,text: this.text});
            const requestOptions = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': Auth.token
                },
                body: JSON.stringify({
                    week: this.week,
                    text: this.text
                    })
            }
            console.log(requestOptions);
            fetch("http://localhost:1337/reports/", requestOptions)
            .then(function(response) {
                console.log(response);
                 return response.json();
            })
            .then(function(result) {
                console.log(result);
            })
        }

    }
}
</script>
