import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import router from '@/router/index'


import stocks from './Modules/stocksStore'
import portfolioStore from './Modules/portfolioStore'
// import auth from './Modules/auth'
// import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.idToken
      state.userId = userData.userId
  },
    signUpAuthUser (state, userData) {
      state.idToken = userData.idToken
  },
    storeUser (state, user) {
      state.user = user 
  }, 
    clearAuthData (state) {
      state.idToken= null,
      state.userId= null
  }
  },
  actions: {
    signup: ({commit, dispatch}, authData) => {
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwLgqqkYv-eS2X1WTgp3lYfXj5nNvoqoQ',{
         email: authData.email,
         password: authData.password,
         returnSecureToken: true
        })
       .then(res => { 
          console.log(res)
          commit('signUpAuthUser', {
              idToken: res.data.idToken}),
          dispatch('storeUser', authData)
        })
        .catch(err => {
          console.log(err)
          if (err) {
            if (confirm('This email is alreday used. Please provide different one. :)')) {
              router.replace('/signup')
            }
          }
        })
        router.replace('/signin') 
  },
  signUserIn ({commit, dispatch}, authData) {
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwLgqqkYv-eS2X1WTgp3lYfXj5nNvoqoQ',{
         email: authData.email,
         password: authData.password,
         returnSecureToken: true
        })
        .then(res => { 
          console.log(res)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('expirationDate', expirationDate)
          dispatch('autoLogOut', res.data.expiresIn)
          commit('authUser', {
             idToken: res.data.idToken,
             userId: res.data.localId
         })
         router.replace('/')
        //  dispatch('storeUser', authData)
      })
      .catch(err => {
        console.log(err)
        if (err) {
          if (confirm('Sorry, Invalid email or password :) !!! For registration please enter OK')) {
            router.replace('/signup')
          } else {
            location.reload();
          }
        }
      })
      
      
  },
  autoLogin({commit}) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const expirationDate = localStorage.getItem('expirationDate')
    const now = new Date()
    if(!token) {
      return
    }
    if(now >= expirationDate) {
      return
    }
    commit('authUser', {
      idToken: token,
      userId: userId
    })
    router.replace('/')
  },
  logOut: ({commit}) => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')

    commit('clearAuthData')
    router.replace('/signin')
  },
  autoLogOut ({commit}, expirationTime) {
    setTimeout(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('expirationDate')
      commit('clearAuthData')
      router.replace('/signin')
    }, expirationTime * 1000)
  },
  
  storeUser: ({state}, authData) => {
      if(!state.idToken){
          return
      }
      axios.post('https://my-stock-trader-929fb.firebaseio.com/users.json' + '?auth=' + state.idToken, authData)
          .then(res => console.log(res))
          .catch(err => console.log(err))
      
  },
  fetchUser: ({commit,state}) => {
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
      
  },

  // this is for Stock_Trader

  saveData: ({commit, state}, order) => {
    axios.put('https://my-stock-trader-929fb.firebaseio.com/stock.json' + '?auth=' + state.idToken, order)
    commit()
  },

  loadData: ({commit, state}) => {
    axios.get('https://my-stock-trader-929fb.firebaseio.com/stock.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log(res)
          const data = res.data
            if (data) {
                const stocks = data.stocks;
                const funds = data.funds;
                const stockPortfolio = data.stockPortfolio;

                const portfolio = {
                    stockPortfolio,
                    funds
                };
                console.log(data);

                commit('SET_STOCKS', stocks);
                commit('SET_PORTFOLIO', portfolio);
            }
        })
}
  },
  getters: {
    user (state) {
      return state.user
  },
  isAuthenticated (state) {
    return state.userId !== null
  },
  idToken (state) {
    return state.idToken
  }
  },
  modules: {
    // auth,
    stocks,
    portfolioStore
  }
})

// export default new Vuex.Store({
//   state: {
//     idToken: null,
//     userId: null,
//     user: null
//   },
//   mutations: {
//     authUser (state, userData) {
//       state.idToken = userData.token
//       state.userId = userData.userId
//     },
//     storeUser (state, user) {
//       state.user = user
//     },
//     clearAuthData (state) {
//       state.idToken = null
//       state.userId = null
//     }
//   },
//   actions: {
//     setLogoutTimer ({commit}, expirationTime) {
//       setTimeout(() => {
//         commit('clearAuthData')
//       }, expirationTime * 1000)
//     },
//     signup ({commit, dispatch}, authData) {
//       axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwLgqqkYv-eS2X1WTgp3lYfXj5nNvoqoQ', {
//         email: authData.email,
//         password: authData.password,
//         returnSecureToken: true
//       })
//         .then(res => {
//           console.log(res)
//           commit('authUser', {
//             token: res.data.idToken,
//             userId: res.data.localId
//           })
//           const now = new Date()
//           const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
//           localStorage.setItem('token', res.data.idToken)
//           localStorage.setItem('userId', res.data.localId)
//           localStorage.setItem('expirationDate', expirationDate)
//           dispatch('storeUser', authData)
//           dispatch('setLogoutTimer', res.data.expiresIn)
//         })
//         .catch(error => console.log(error))
//     },
//     signin ({commit, dispatch}, authData) {
//       axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwLgqqkYv-eS2X1WTgp3lYfXj5nNvoqoQ', {
//         email: authData.email,
//         password: authData.password,
//         returnSecureToken: true
//       })
//         .then(res => {
//           console.log(res)
//           const now = new Date()
//           const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
//           localStorage.setItem('token', res.data.idToken)
//           localStorage.setItem('userId', res.data.localId)
//           localStorage.setItem('expirationDate', expirationDate)
//           commit('authUser', {
//             token: res.data.idToken,
//             userId: res.data.localId
//           })
//           dispatch('setLogoutTimer', res.data.expiresIn)
//         })
//         .catch(error => console.log(error))
//     },
//     tryAutoLogin ({commit}) {
//       const token = localStorage.getItem('token')
//       if (!token) {
//         return
//       }
//       const expirationDate = localStorage.getItem('expirationDate')
//       const now = new Date()
//       if (now >= expirationDate) {
//         return
//       }
//       const userId = localStorage.getItem('userId')
//       commit('authUser', {
//         token: token,
//         userId: userId
//       })
//     },
//     logout ({commit}) {
//       commit('clearAuthData')
//       localStorage.removeItem('expirationDate')
//       localStorage.removeItem('token')
//       localStorage.removeItem('userId')
//       router.replace('/signin')
//     },
//     storeUser ({commit, state}, userData) {
//       if (!state.idToken) {
//         return
//       }
//       axios.post('https://my-stock-trader-929fb.firebaseio.com/users.json' + '?auth=' + state.idToken, userData)
//         .then(res => console.log(res))
//         .catch(error => console.log(error))
//         commit()
//     },
//     fetchUser ({commit, state}) {
//       if (!state.idToken) {
//         return
//       }
//       axios.get('https://my-stock-trader-929fb.firebaseio.com/users.json' + '?auth=' + state.idToken)
//         .then(res => {
//           console.log(res)
//           const data = res.data
//           const users = []
//           for (let key in data) {
//             const user = data[key]
//             user.id = key
//             users.push(user)
//           }
//           console.log(users)
//           commit('storeUser', users[0])
//         })
//         .catch(error => console.log(error))
//     }
//   },
//   getters: {
//     user (state) {
//       return state.user
//     },
//     isAuthenticated (state) {
//       return state.idToken !== null
//     }
//   }
// })
