import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref, computed, onMounted, onUnmounted } from 'vue'

import { initializeApp } from 'firebase/app'

export const firebaseApp = initializeApp({

  apiKey: "AIzaSyDHjAy4jTZMMw9Emg0qn25jbl9mRiOi27U",

  authDomain: "cscuscheduler.firebaseapp.com",

  databaseURL: "https://cscuscheduler-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "cscuscheduler",

  storageBucket: "cscuscheduler.appspot.com",

  messagingSenderId: "708856691398",

  appId: "1:708856691398:web:017c94a3bb0ef5bab835c7",

  measurementId: "G-7MNMJ7G0NT"


})

export const getUserState = () =>
  new Promise((resolve, reject) =>
    onAuthStateChanged(getAuth(), resolve, reject)
  )

export const useAuthState = () => {
  const user = ref(null)
  const error = ref(null)

  const auth = getAuth()
  let unsubscribe
  onMounted(() => {
    unsubscribe = onAuthStateChanged(
      auth,
      u => (user.value = u),
      e => (error.value = e)
    )
  })
  onUnmounted(() => unsubscribe())

  const isAuthenticated = computed(() => user.value != null)

  return { user, error, isAuthenticated }
}
export const db = firebaseApp.firestore;