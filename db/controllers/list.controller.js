import { ListService } from "../services/list.service.js";
import { ListMembersService } from "../services/list-member.service.js";

export async function createListController(req, res, next) {
  try {
    const userId = req.user.userId;
    const { title } = req.body;
    const list = await ListService.createListService({
      title,
      userId,
    });
    res.status(201).json({
      ok: true,
      message: "List created",
      data: list,
    });
  } catch (error) {
    next(error);
  }
}

export async function getListsController(req, res, next) {
  try {
    const userId = req.user.userId;
    const lists = await ListService.getListsService({ userId });
    res.status(200).json({
      ok: true,
      message: "Lists found",
      data: lists,
    });
  } catch (error) {
    next(error);
  }
}

export async function patchListController(req, res, next) {
  try {
    const listId = req.params.listId;
    const { title } = req.body;
    const userId = req.user.userId;
    const patchedList = await ListService.patchListService({
      userId,
      listId,
      title,
    });
    res
      .status(200)
      .json({ ok: true, message: "List patched", data: patchedList });
  } catch (error) {
    next(error);
  }
}

export async function deleteListController(req, res, next) {
  try {
    const listId = req.params.listId;
    const userId = req.user.userId;
    const deleteList = await ListService.deleteListService({ listId, userId });
    res.status(201).json({
      ok: true,

      message: "List deleted",
      data: deleteList,
    });
  } catch (error) {
    next(error);
  }
}

export async function getListController(req, res, next) {
  try {
    const listId = req.params.listId;
    const userId = req.user.userId;
    const list = await ListService.getListService({ listId, userId });
    const members = await ListMembersService.getListMembers({ listId, userId });
    res.status(200).json({
      ok: true,
      message: "List found",
      data: { ...list, members },
    });
  } catch (error) {
    next(error);
  }
}
