<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-info">
        <router-link to="/"><a class="navbar-brand" href="#" v-if="auth">Home</a></router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active" v-if="auth">
                    <router-link to="/portfolio" tag="li"><a class="nav-link" href="#">Portfolio</a></router-link>
                </li>
                <li class="nav-item active" v-if="auth">
                    <router-link to="/stocks" tag="li"><a class="nav-link" href="#">Stocks</a></router-link>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li v-if="auth"><a class="nav-link" href="#" @click="endDay">End Day</a></li>
                <li v-if="auth"><a class="nav-link" href="#" @click="saveData">Save</a></li>
                <li v-if="auth"><a class="nav-link" href="#" @click="loadData">Load</a></li>
                <li class="nav-item active" v-if="!auth">
                    <router-link to="/signup" tag="li" ><a class="nav-link" href="#">SignUp</a></router-link>
                </li>
                <li class="nav-item active" v-if="!auth">
                    <router-link to="/signin" tag="li"><a class="nav-link" href="#">SingIn</a></router-link>
                </li>
                <li class="nav-link" v-if="auth"> 
                    <button @click="onLogout" class="logout">Logout</button>
                </li>
                    
            </ul>
            <h6 class="nav nav-bar-text" v-if="auth"> <strong>Funds: {{ funds | currency}}</strong> </h6>
        </div>
    </nav>
</template>

<script>
export default {
    computed: {
        funds(){
            return this.$store.getters.funds
        },
        auth() {
            return this.$store.getters.isAuthenticated
        }
    },
    methods: {
        endDay() {
            this.$store.dispatch('randomizeStocks');
        },
        saveData() {
            const order = {
                funds: this.$store.getters.funds,
                stockPortfolio: this.$store.getters.stockPortfolio,
                stocks: this.$store.getters.stocks
            }
            this.$store.dispatch('saveData', order)
        },
        loadData() {
            this.$store.dispatch('loadData');
        },
        onLogout() {
            this.$store.dispatch('logOut')
        }
    }
}
</script>

<style scoped>
.logout {
    background-color: transparent;
    border: none;
    font: inherit;
    color: white;
    cursor: pointer;
  }
  .logout:hover {
    color: rgb(172, 16, 16);
    cursor: pointer;
  }
</style>