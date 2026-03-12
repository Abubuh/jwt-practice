import { ListMemberRepository } from "../repositories/list-member-repository.js";
import { UserRepository } from "../repositories/user-repository.js";

export class ListMembersService {
  static async addMemberService({ listId, requesterId, userId, role }) {
    // 1. Verificar que quien invita sea admin o editor
    const requester = await ListMemberRepository.getMemberByUserId({
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
    const existingMember = await ListMemberRepository.getMemberByUserId({
      listId,
      userId,
    });
    if (existingMember) throw new AppError("User is already a member", 409);

    // 4. Agregar miembro
    return await ListMemberRepository.addMemberRepository({
      listId,
      userId,
      role,
    });
  }

  static async getListMembers({ listId, userId }) {
    const listMembers = await ListMemberRepository.getListMembers({
      listId,
      userId,
    });
    return listMembers;
  }
}
