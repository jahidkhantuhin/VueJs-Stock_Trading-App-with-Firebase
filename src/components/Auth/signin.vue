<template>
    <div class="container">
        <div id="signin">
            <div class="signin-form">
                <form @submit.prevent="onSubmit">
                    <div class="input" :class="{invalid: $v.email.$error}">
                        <label for="email">Mail</label>
                        <input
                                type="email"
                                id="email"
                                @blur="$v.email.$touch()"
                                v-model="email">
                        <p v-if="!$v.email.email">Please enter valid email address.</p>
                    </div>
                    <div class="input" :class="{invalid: $v.password.$error}">
                        <label for="password">Password</label>
                        <input
                                type="password"
                                id="password"
                                @blur="$v.password.$touch()"
                                v-model="password">
                    </div>
                    <div class="submit">
                        <button type="submit"
                        :disabled= "$v.$invalid">Submit</button>
                    </div>
                </form>
            </div>
        </div>  
    </div>
</template>

<script>
import { required, email, minLength} from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
        }
        this.email= null,
        this.password= null
        console.log(formData)
        this.$store.dispatch('signUserIn', formData)
      }
    },
    validations: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  }
</script>

<style scoped>
  .signin-form {
    width: 400px;
    margin: 30px auto;
    margin-left: 400px;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input.invalid label {
    color: red
  }
  .input.invalid input {
    border: 1px solid red;
    background-color: rgba(100, 0, 13, 0.37)
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>