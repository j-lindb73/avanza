<template>
 
    <form 
        id="regform" 
        class="w3-container"
        @submit.prevent = "submitForm" >

    
    <h2>{{ week}}</h2>
    
    <label class="w3-text-blue"><b>Text</b></label>
    <textarea class="w3-input w3-border" type="text" v-model="text"></textarea>

    <button class="w3-btn w3-blue w3-margin">Spara</button>
 
    </form>
 
</template>

<script>

import Auth from '@/components/Auth';
import Vars from '@/components/Vars'

export default {
    name: 'Report_formEdit',
    data() {
        return {
            week: "",
            text: ""
        }
    },
    mounted() {
    this.getReport(this.$route.params.kmom)
    },
    methods: {
        submitForm: function() {
            console.log({week: this.week,text: this.text});
            const requestOptions = {
                method: "PUT",
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
            // fetch("http://localhost:1337/reports/", requestOptions)
            fetch(Vars.baseUrl + "/reports/", requestOptions)
            .then(function(response) {
                console.log(response);
                 return response.json();
            })
            .then(function(result) {
                console.log(result);
            })
        },
        getReport(week) {
        let that = this;
        // fetch("https://me-api.jsramverk.se")
        // fetch("http://localhost:1337/reports/week/" + week)
        fetch(Vars.baseUrl + "/reports/week/" + week)
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            console.log(result.data);
            that.text = result.data.text;
            that.week = result.data.week;
        })
        .catch(function(err) {
            console.log(err);
        });
        }
    }
}
</script>
