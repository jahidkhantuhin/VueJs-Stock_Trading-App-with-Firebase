<template>
    <div >
        <div class="card bg-light" style="max-width: 18rem;">
        <div class="card-header"> {{stock.name}}
            <small>(Price: {{stock.price}} | Quantity: {{ stock.quantity }})</small>
        </div>
        <div class="card-body">
            <div class="pull-left">
                <input type="number" class="form-control" 
                 placeholder="quantity" v-model="quantity"
                 :class="{danger: insufficientQuantity}">
            </div>
            <div class="pull-right">
                <button style="margin-top: 10px; margin-left: 180px" 
                 class="btn btn-danger" @click="sellStock"
                 :disabled="insufficientQuantity || 
                 quantity <= 0 || !isInteger(quantity)"
                 >{{ insufficientQuantity ? 'NotEnough quantity' : 'Sell'}}
                 </button>
            </div>
        </div>
    </div>
    </div>
    
</template>

<script>

import {mapActions} from 'vuex'

export default {
/* eslint-disable */
    props: ['stock'],
    data() {
        return {
            quantity: null
        }
    },
    methods: {
        isInteger(n) {
            return n % 1 === 0;
        },
    ...mapActions({
            placeSellOrder: 'sellStock'
        }),
    sellStock() {
            const order = {
                stockId: this.stock.id,
                stockPrice: this.stock.price,
                quantity: this.quantity
            };
            this.placeSellOrder(order);
            this.quantity = null;
            }
    },
    computed: {
        funds(){
            return this.$store.getters.funds
        },
        insufficientQuantity(){
            return this.quantity > this.stock.quantity
        }
    }
}

</script>

<style scoped>
    .danger{
        border: 3px solid red;
    }
</style>