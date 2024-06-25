import { Router } from "express";
import { farmaciaRoutes } from "./farmaciaRoutes.js";

const routes = Router();

routes.use( farmaciaRoutes );

export { routes }
