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
  deleteMember,
  getMembersController,
  patchListMemberController,
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
routerLists.delete(
  "/lists/:listId/members/:memberId",
  authMiddleware,
  deleteMember
);
//--------Done-----------^
routerLists.patch(
  "/lists/:listId/members/:memberId/role",
  authMiddleware,
  patchListMemberController
);

//-----Todos routes-----

export default routerLists;
