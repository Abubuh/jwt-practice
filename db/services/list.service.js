import crypto from "crypto";
import { ListRepository } from "../repositories/list-repository.js";
import { AppError } from "../errors/AppError.js";
export class ListService {
  static async createListService({ title, userId }) {
    const id = crypto.randomUUID();
    const list = await ListRepository.createList({
      id,
      title,
      userId,
    });

    return list;
  }
  static async getListsService({ userId }) {
    const lists = await ListRepository.getLists(userId);
    return lists;
  }

  static async patchListService({ userId, listId, title }) {
    const updatedList = await ListRepository.patchList({
      userId,
      listId,
      title,
    });
    if (!updatedList) {
      throw new AppError("List not found", 404);
    }
    return updatedList;
  }

  static async deleteListService({ listId, userId }) {
    const deletedList = await ListRepository.deleteList({ listId, userId });
    if (!deletedList) {
      throw new AppError("List not found", 404);
    }

    return deletedList;
  }

  static async getListService({ listId, userId }) {
    const list = await ListRepository.getList({ listId, userId });
    if (!list) {
      throw new AppError("List not found", 404);
    }
    return list;
  }
}
