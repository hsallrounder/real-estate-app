import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';
import PropertyDetailsPage from './pages/PropertyDetails.vue'; // Ensure this path is correct
import RegisterPage from './pages/RegisterPage.vue';
import SellerDashboardPage from './pages/SellerDashboard.vue'; // Ensure this path is correct
import BuyerDashboardPage from './pages/BuyerDashboard.vue'; // Add this import

Vue.use(VueRouter);

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/property-details/:id', component: PropertyDetailsPage }, // Assuming property details will be fetched by ID
  { path: '/register', component: RegisterPage },
  { path: '/seller-dashboard', component: SellerDashboardPage, meta: { requiresAuth: true, role: 'seller' } },
  { path: '/buyer-dashboard', component: BuyerDashboardPage, meta: { requiresAuth: true, role: 'buyer' } },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login');
    } else if (to.meta.role && to.meta.role !== userRole) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
