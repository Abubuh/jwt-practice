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
import { validatePatchList } from "../validations/validatePatchList.js";

const routerLists = express.Router();

routerLists.get("/lists", authMiddleware, getListsController);
routerLists.post(
  "/lists",
  authMiddleware,
  validatePostList,
  createListController
);
routerLists.patch(
  "/lists/:listId",
  authMiddleware,
  validatePatchList,
  patchListController
);
routerLists.delete("/lists/:listId", authMiddleware, deleteListController);
routerLists.get("/lists/:listId", authMiddleware, getListController);

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
