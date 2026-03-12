import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createListController,
  deleteListController,
  getListController,
  getListsController,
  patchListController,
} from "../controllers/list.controller.js";
import {
  addMemberController,
  getMembersController,
} from "../controllers/list-members.controller.js";

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
routerLists.post("/lists/:listId/members", authMiddleware, addMemberController);
//--------Done-----------^
routerLists.delete("/lists/:listId/members/:memberId", authMiddleware);
routerLists.patch(
  "/lists/:listId/members/:memberId/role",
  authMiddleware,
  (req, res, next) => {}
);

//-----Todos routes-----

export default routerLists;
