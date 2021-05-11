import axios from 'axios'

const state = {
    idToken: null,
    userId: null,
    user: null
    
};

const mutations = {
    authUser (state, userData) {
        state.idToken = userData.idToken
        state.userId = userData.userId
    },
    storeUser (state, user) {
        state.user = user 
    }
};

const actions = {
    signup: ({commit,dispatch}, authData) => {
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwLgqqkYv-eS2X1WTgp3lYfXj5nNvoqoQ',{
           email: authData.email,
           password: authData.password,
           returnSecureToken: true
          })
         .then(res => { 
             console.log(res)
             commit('authUser', {
                idToken: res.data.idToken,
                userId: res.data.localId
            })

         })
         dispatch('storeUser', authData)
         
    },
    signin: ({commit,dispatch}, authData) => {
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwLgqqkYv-eS2X1WTgp3lYfXj5nNvoqoQ',{
           email: authData.email,
           password: authData.password,
           returnSecureToken: true
          })
          .then(res => { 
            console.log(res)
            commit('authUser', {
               idToken: res.data.idToken,
               userId: res.data.localId
           })

        })
        dispatch('storeUser', authData)
    },
    storeUser: ({commit,state}, authData) => {
        if(!state.idToken){
            return
        }
        axios.post('https://my-stock-trader-929fb.firebaseio.com/users.json' + '?auth=' + state.idToken, authData)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            commit()
        
    },
    fetchUser: ({commit}) => {
        if(!state.idToken){
            return
        }
        axios.get('https://my-stock-trader-929fb.firebaseio.com/users.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log(res)
          const data = res.data
          const users = []
          for (let key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
          }
          console.log(users)
          const user = users[0]
          commit('storeUser', user)
        })
        .catch(error => console.log(error))
        
    }    

};

const getters = {
    user (state) {
        return state.user
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};