<template>
    <div id="nav">
    <router-link to="/">Hem</router-link> |
    <router-link to="/chat">Chat</router-link> |
    <router-link to="/register">Admin</router-link>

 
    <!-- <p>{{ token }}</p> -->
    <!-- <p>{{ loggedin }} </p> -->
    </div>
</template>

<script>

import Auth from '../components/Auth';
export default {
    name: 'Nav',
    data() {
        return {
            token : Auth.token,
            loggedin: Auth.loggedin

        }
    }
}
</script>