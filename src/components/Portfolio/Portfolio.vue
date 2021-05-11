<template>
    <div class="container">
        <div>
            <stock style="padding: 10px 10px;" v-for="stock in stocks" v-bind:key="stock.id" :stock="stock"></stock>
        </div>
    </div>
</template>
<script>
import stock from '@/components/Portfolio/Stock.vue'
export default {
    components: {
        stock
    },
    computed: {
        stocks() {
            return this.$store.getters.stockPortfolio;
        }
    }
    
}
</script>