import { defineStore } from 'pinia';
import { auth } from '@/js/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged  } from "firebase/auth";


export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {}
    }
  },
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('user logged in', user)
          this.user.id = user.uid
          this.user.email = user.email
          this.router.push('/notes')
        } else {
          this.user = {}
          this.router.replace('/auth')
        }
      });
    },
    registerUser(credentials) {
      console.log('registerUser', credentials)
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log('gj user', user)
      })
      .catch((error) => {
        console.error('error', error.code, error.message)
      });
    },
    loginUser(credentials) {
      console.log('user logged in', credentials)
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log('gj user on login', user)
      })
      .catch((error) => {
        console.error('error', error.code, error.message)
      });
    },
    logoutUser() {
      signOut(auth).then(() => {
        // console.log('User logouted')
      }).catch((error) => {
        console.error('logout error', error)
      })
    }
  }
});
