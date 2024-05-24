import { defineStore } from 'pinia';
import { auth } from '@/js/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged  } from "firebase/auth";
import { useStoreNotes } from '@/stores/storeNotes';



export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {},
      showSuccessRegister: false,
    }
  },
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        const storeNotes = useStoreNotes();
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          storeNotes.init();
          if (!this.showSuccessRegister) {
            this.router.push('/notes')
          } else {
            setTimeout(() => {
              this.showSuccessRegister = false
              this.router.push('/notes')
            }, 3000);
          }
        } else {
          this.user = {}
          this.router.replace('/auth')
          storeNotes.clearNotes();
        }
      });
    },
    registerUser(credentials) {
      if (credentials.email && credentials.password) {
        this.showSuccessRegister = true;
      }
      console.log(credentials, this.showSuccessRegister)
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.error('error', error.code, error.message)
      });
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.error('error', error.code, error.message)
      });
    },
    logoutUser() {
      this.showSuccessRegister = false;
      signOut(auth).then(() => {
      }).catch((error) => {
        console.error('logout error', error)
      })
    }
  }
});
