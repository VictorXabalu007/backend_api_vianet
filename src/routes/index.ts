import { Router } from "express";
import { farmaciaRoutes } from "./farmaciaRoutes";

const routes = Router();

routes.use( farmaciaRoutes );

export { routes }
