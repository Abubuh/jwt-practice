import crypto from "crypto";
import { ListRepository } from "../repositories/list-repository.js";
import { AppError } from "../errors/AppError.js";
import { UserRepository } from "../repositories/user-repository.js";

export class ListService {
  static async createListService({ title, userId }) {
    const id = crypto.randomUUID();
    const list = await ListRepository.createList({
      id,
      title,
      userId,
    });

    await ListRepository.addMemberRepository({
      listId: id,
      userId,
      role: "owner",
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

  static async addMemberService({ listId, requesterId, userId, role }) {
    // 1. Verificar que quien invita sea admin o editor
    const requester = await ListRepository.getMemberByUserId({
      listId,
      userId: requesterId,
    });
    if (!requester || !["owner", "editor"].includes(requester.role)) {
      throw new AppError("Not authorized", 403);
    }

    // 2. Verificar que el usuario a agregar exista
    const user = await UserRepository.getUserById(userId);
    if (!user) throw new AppError("User not found", 404);

    // 3. Verificar que no sea ya miembro
    const existingMember = await ListRepository.getMemberByUserId({
      listId,
      userId,
    });
    if (existingMember) throw new AppError("User is already a member", 409);

    // 4. Agregar miembro
    return await ListRepository.addMemberRepository({ listId, userId, role });
  }

  static async getListMembers({ listId, userId }) {
    const listMembers = await ListRepository.getListMembers({ listId, userId });
    return listMembers;
  }
}
