import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  addMemberController,
  createListController,
  deleteListController,
  getListController,
  getListsController,
  getMembersController,
  patchListController,
} from "../controllers/list.controller.js";

const routerLists = express.Router();

routerLists.get("/lists", authMiddleware, getListsController);
routerLists.post("/lists", createListController);
routerLists.patch("/lists/:listId", authMiddleware, patchListController);
routerLists.delete("/list/:listId", authMiddleware, deleteListController);
routerLists.get("/list/:listId", authMiddleware, getListController);

//-^-Done-^-//

//--------------
routerLists.post(
  "/lists/:listId/invite",
  authMiddleware,
  (req, res, next) => {}
);

//--- Members routes---

routerLists.get("/lists/:listId/members", authMiddleware, getMembersController);
//--------Done-----------^
routerLists.post("/lists/:listId/members", authMiddleware, addMemberController);
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

export default routerLists;
