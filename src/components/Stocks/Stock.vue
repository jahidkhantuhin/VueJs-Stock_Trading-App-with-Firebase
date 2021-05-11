<template>
    <div >
        <div class="card bg-light" style="max-width: 18rem;">
        <div class="card-header"> {{stock.name}}
            <small>(price: {{stock.price}})</small>
        </div>
        <div class="card-body">
            <div class="pull-left">
                <input type="number" class="form-control" 
                 placeholder="quantity" v-model="quantity"
                 :class="{danger: insufficientFund}">
            </div>
            <div class="pull-right">
                <button style="margin-top: 10px; margin-left: 180px" 
                 class="btn btn-success" @click="buyStock"
                 :disabled="insufficientFund || quantity <= 0 || !isInteger(quantity)"
                 >{{ insufficientFund ? 'Not enough funds' : 'Buy'}}
                 </button>
            </div>
        </div>
    </div>
    </div>
    
</template>

<script>
export default {
    props: ['stock'],
    data() {
        return {
            quantity: null
        }
    },
    /* eslint-disable */
    methods: {
        buyStock() {
            const order = {
                stockId: this.stock.id,
                stockPrice: this.stock.price,
                quantity: this.quantity
            };
            this.$store.dispatch('buyStock', order),
            this.quantity= null
        },
        isInteger(n) {
            return n % 1 === 0;
        }
    },
    computed: {
        funds(){
            return this.$store.getters.funds
        },
        insufficientFund(){
            return this.quantity * this.stock.price > this.funds
        }
    }
}

</script>
<style scoped>
    .danger{
        border: 3px solid red;
    }
</style>