import {Router} from "express";
import {farmaciaRoutes} from "./farmaciaRoutes.js";
import {distribuidorRoutes} from "./distribuidorRoutes.js";
import {userRoutes} from "./userRoutes.js";
import {uploadRoute} from "./uploadRoutes.js";

const routes = Router();

routes.use(farmaciaRoutes);
routes.use(distribuidorRoutes);
routes.use(userRoutes);
routes.use(uploadRoute);


export {routes}
