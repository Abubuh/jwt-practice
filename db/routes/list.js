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
import { validatePostList } from "../validations/validatePostList.js";
import { validateListMember } from "../validations/validateListMember.js";
import { validatePostMember } from "../validations/validatePostMember.js";

const routerLists = express.Router();

routerLists.get("/lists", authMiddleware, getListsController);
routerLists.post("/lists", validatePostList, createListController);
routerLists.patch("/lists/:listId", authMiddleware, patchListController);
routerLists.delete("/list/:listId", authMiddleware, deleteListController);
routerLists.get("/list/:listId", authMiddleware, getListController);

//-^-Done-^-//

//--------------

//--- Members routes---

routerLists.get("/lists/:listId/members", authMiddleware, getMembersController);
routerLists.post(
  "/lists/:listId/members",
  authMiddleware,
  validatePostMember,
  addMemberController
);
routerLists.delete(
  "/lists/:listId/members/:memberId",
  authMiddleware,
  deleteMember
);
routerLists.patch(
  "/lists/:listId/members/:memberId/role",
  authMiddleware,
  validateListMember,
  patchListMemberController
);
//--------Done-----------^
routerLists.post(
  "/lists/:listId/invite",
  authMiddleware,
  (req, res, next) => {}
);
export default routerLists;
