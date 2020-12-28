import Home from '@/pages/Home';
import About from '@/pages/About';
// import Child from '@page/Child'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/about',
    component: About,
    // routes: [
    //   {
    //     path: '/about/child',
    //     component: Child
    //   }
    // ]
  },
];

export default routes;
