import X from "../pages/X/main";
import Instagram from "../pages/Instagram/main";
import Login from "../pages/Login/main";
import Dashboard from "../pages/Dashboard/main";
import { base_url } from "../constants";
import Publicaciones from "../pages/Publicaciones/main";

const rutas = [     
    { path: `${base_url}/X`, component: X, exact: true },
    { path: `${base_url}/Instagram`, component: Instagram, exact: true },
    { path: `${base_url}/login`, component: Login, exact: true },
    { path: `${base_url}/dashboard`, component: Dashboard, exact: true },
    { path: `${base_url}/post`, component: Publicaciones, exact: true }
]; 



export default rutas;