<template>
  <div class="container">
    <myNavBar></myNavBar>
    <div class="row">
      <div class="col-xs-12">
          <transition name="slide" mode="out-in">
            <router-view/>
          </transition>
      </div>
    </div>
    
  </div>
</template>

<script>

import myNavBar from '@/components/myNavBar.vue'
export default {
    components: {
        myNavBar
    },
    created() {
      this.$store.dispatch('initStocks')
      this.$store.dispatch('autoLogin')
    }
}
</script>

<style>
body{
  padding: 30px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.slide-enter-active {
  animation: slide-in 200ms ease-out forwards;
}
.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-15px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
@keyframes slide-out {
  from {
    transform: translateY(0px);
    opacity: 1;
  }
  to {
    transform: translateY(-15px);
    opacity: 0;
  }
}
</style>
