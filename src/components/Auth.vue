<template>
    <div>

    </div>
</template>


<script>
export default {
    token: "",
    loggedin: false,
    name: 'Auth',
    data() {
        return {
            loggedin: this.loggedin,
            token: this.token
        }
    },
    methods: {
        login: function() {
            this.loggedin = true
        },
        loginCheck: function() {
            return this.loggedin;
        }
    }
}
</script>