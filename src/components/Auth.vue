<template>
    <div>

    </div>
</template>


<script>
export default {
    token: "",
    email: "",
    loggedin: false,
    name: 'Auth',
    data() {
        return {
            loggedin: this.loggedin,
            token: this.token,
            email: this.email
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