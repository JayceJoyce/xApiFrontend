import X from "../pages/X/main";
import Instagram from "../pages/Instagram/main";
import Facebook from "../pages/Facebook/main";
import { base_url } from "../constants";

const rutas = [     
    { path: `${base_url}/X`, component: X, exact: true },
    { path: `${base_url}/Instagram`, component: Instagram, exact: true },
    { path: `${base_url}/Facebook`, component: Facebook, exact: true }
]; 



export default rutas;