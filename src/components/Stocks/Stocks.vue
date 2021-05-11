<template>
    <div class="container">
        <div>
            <app-stock style="padding: 10px 10px;" v-for="stock in stocks" v-bind:key="stock.id" :stock="stock"></app-stock>
        </div>
    </div>
</template>

<script>
import appStock from '@/components/Stocks/Stock.vue'
export default {
    components: {
        appStock
    },
    computed: {
        stocks() {
            return this.$store.getters.stocks;
        },
    }

}
</script>

<style scoped>
 
</style>