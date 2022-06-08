import { createRouter, createWebHistory } from 'vue-router'

import { getUserState } from '../firebase'
import { getAuth } from 'firebase/auth'

const routes = [
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/AdminPage.vue'),
    meta: { requiresAuth: true, title: 'Admin | CSCUScheduler'}
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/TestdB.vue'),
    meta: { requiresAuth: true, title: 'Test | CSCUScheduler'}
  },
  {
    path: '/',
    name: 'Login_startup',
    component: () => import('../views/LoginPage.vue'),
    meta: { requiresUnauth: true, title: 'Login | CSCUScheduler' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue'),
    meta: { requiresUnauth: true, title: 'Login | CSCUScheduler' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterPage.vue'),
    meta: { requiresUnauth: true, title: 'Register | CSCUScheduler' }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
    meta: { requiresAuth: true, title: 'Home | CSCUScheduler' }
  },  
  {
    path: '/subject',
    name: 'Subject',
    component: () => import('../views/SubjectPage.vue'),
    meta: { requiresAuth: true, title: 'Subject | CSCUScheduler' }
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: () => import('../views/SchedulePage.vue'),
    meta: { requiresAuth: true, title: 'Schedule | CSCUScheduler' }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/HistoryPage.vue'),
    meta: { requiresAuth: true, title: 'History | CSCUScheduler'}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresUnauth = to.matched.some(record => record.meta.requiresUnauth)
  //const admin = await getAuth().currentUser.email
  const isAuth = await getUserState()

  if (requiresAuth && !isAuth) next('/login')
  else if (requiresUnauth && isAuth) next('/home')
  else next()
  



  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  
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
