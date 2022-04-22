import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref, computed, onMounted, onUnmounted } from 'vue'

import { initializeApp } from 'firebase/app'

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDEhrluB2j5pxXdM5WC14_DwAwWe1BThuM",

  authDomain: "training2-c9ce3.firebaseapp.com",

  projectId: "training2-c9ce3",

  storageBucket: "training2-c9ce3.appspot.com",

  messagingSenderId: "143310875267",

  appId: "1:143310875267:web:19e7c3c5aed616a08809b6"
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