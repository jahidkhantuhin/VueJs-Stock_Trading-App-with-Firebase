<template>
    <div class="container">
        <h1>Trade or View your Portfolio</h1>
        <h6>You may Save & Load your Data</h6>
        <h6>Click on 'End Day' to begin a New Day!</h6>
        <h4> {{msg | upper}} </h4>
        <hr>
        <h6><strong>Your Funds: {{ funds | currency }}</strong></h6>
    </div>
</template>

<script>

    export default {
        data(){
            return {
                msg: 'This is for testing the filter',
                show: false
            }
            },
        computed: {
            funds() {
                return this.$store.getters.funds;
            },
            email() {
              return this.$store.getters.user.email
            }
        },
        created () {
          this.$store.dispatch('fetchUser')
    }
    }
</script>

<style scoped>
  h1, p {
    text-align: center;
  }

  p {
    color: red;
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