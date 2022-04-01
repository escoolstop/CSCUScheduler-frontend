import { createRouter, createWebHistory } from 'vue-router'
import { getUserState } from '../firebase'

const routes = [
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/TestdB.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'Login_startup',
    component: () => import('../views/LoginPage.vue'),
    meta: { requiresUnauth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue'),
    meta: { requiresUnauth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterPage.vue'),
    meta: { requiresUnauth: true }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
    meta: { requiresAuth: true }
  },  
  {
    path: '/subject',
    name: 'Subject',
    component: () => import('../views/SubjectPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: () => import('../views/SchedulePage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/HistoryPage.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresUnauth = to.matched.some(record => record.meta.requiresUnauth)

  const isAuth = await getUserState()

  if (requiresAuth && !isAuth) next('/login')
  else if (requiresUnauth && isAuth) next('/schedule')
  else next()
})

export default router
/*
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const admin = require("firebase-admin");

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cscuscheduler-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = getFirestore();

async function getAll(db) {
    const studentRef = db.collection('student').doc('kXg7J29OKg8D38R9wzy4');
    const doc = await studentRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
}

getAll(db);
*/
