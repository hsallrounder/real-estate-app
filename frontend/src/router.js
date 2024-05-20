import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';
import PropertyDetailsPage from './pages/PropertyDetails.vue'; // Updated path
import RegisterPage from './pages/RegisterPage.vue';
import SellerDashboardPage from './pages/SellerDashboard.vue'; // Updated path

Vue.use(VueRouter);

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/property-details', component: PropertyDetailsPage },
  { path: '/register', component: RegisterPage },
  { path: '/seller-dashboard', component: SellerDashboardPage },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
