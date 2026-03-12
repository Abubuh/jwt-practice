import { ListService } from "../services/list.service.js";

export async function createListController(req, res, next) {
  try {
    const userId = req.user.userId;
    const { title } = req.body;
    const list = await ListService.createListService({
      title,
      userId,
    });
    res.status(201).json(list);
  } catch (error) {
    next(error);
  }
}

export async function getListsController(req, res, next) {
  try {
    const userId = req.user.userId;
    const lists = await ListService.getListsService({ userId });
    res.status(201).json(lists);
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
    res.status(201).json(patchedList);
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
      deleteList,
    });
  } catch (error) {
    next(error);
  }
}

export async function getListController(req, res, next) {
  try {
    const listId = req.params.listId;
    const userId = req.user.userId;
    console.log({ listId, userId });
    const list = await ListService.getListService({ listId, userId });
    res.status(201).json({
      ok: true,
      data: list,
    });
  } catch (error) {
    next(error);
  }
}

export const addMemberController = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const requesterId = req.user.userId; // quien está haciendo la petición
    const { userId, role } = req.body;

    const member = await ListService.addMemberService({
      listId,
      requesterId,
      userId,
      role,
    });
    res.status(201).json({
      ok: true,
      message: "Member added",
      data: member,
    });
  } catch (error) {
    next(error);
  }
};
export const getMembersController = async (req, res, next) => {
  try {
    const listId = req.params.listId;
    const userId = req.user.userId;
    const members = await ListService.getListMembers({ listId, userId });
    return res.status(201).json({
      ok: true,
      data: members,
    });
  } catch (error) {
    next(error);
  }
};
