import { Router } from "express";
import { farmaciaRoutes } from "./farmaciaRoutes.js";
import { distribuidorRoutes } from "./distribuidorRoutes.js";

const routes = Router();

routes.use( farmaciaRoutes );
routes.use( distribuidorRoutes );

export { routes }
