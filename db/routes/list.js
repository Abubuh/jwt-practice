import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createListController,
  deleteListController,
  getListController,
  getListsController,
  patchListController,
} from "../controllers/list.controller.js";

const routerLists = express.Router();

routerLists.get("/lists", authMiddleware, getListsController);
routerLists.post("/lists", createListController);
routerLists.patch("/list/:listId", authMiddleware, patchListController);
routerLists.delete("/list/:listId", authMiddleware, deleteListController);
routerLists.get("/list/:listId", authMiddleware, getListController);

//--------------
routerLists.post(
  "/lists/:listId/invite",
  authMiddleware,
  (req, res, next) => {}
);

//--- Members routes---
routerLists.get(
  "/lists/:listId/members",
  authMiddleware,
  (req, res, next) => {}
);
routerLists.post(
  "/lists/:listId/members",
  authMiddleware,
  (req, res, next) => {}
);
routerLists.delete(
  "/lists/:listId/members/:memberId",
  authMiddleware,
  (req, res, next) => {}
);
routerLists.patch(
  "/lists/:listId/members/:memberId/role",
  authMiddleware,
  (req, res, next) => {}
);

//-----Todos routes-----
routerLists.get("/lists/:listId/todos", authMiddleware, (req, res, next) => {});
routerLists.post(
  "/lists/:listId/todos",
  authMiddleware,
  (req, res, next) => {}
);

export default routerLists;
