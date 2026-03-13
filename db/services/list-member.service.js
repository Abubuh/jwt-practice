import { AppError } from "../errors/AppError.js";
import { ListMemberRepository } from "../repositories/list-member-repository.js";
import { UserRepository } from "../repositories/user-repository.js";

export class ListMembersService {
  static async addMemberService({ listId, requesterId, userId, role }) {
    // 1. Verificar que quien invita sea admin o editor
    const requester = await ListMemberRepository.getMemberByUserId({
      listId,
      userId: requesterId,
    });
    console.log("test", listId, requesterId, userId, role);
    console.log("hi", requester);
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
    const userIsMember = await ListMemberRepository.getMemberByUserId({
      listId,
      userId,
    });
    console.log(userIsMember);
    if (!userIsMember) throw new AppError("List not found.", 403);

    const listMembers = await ListMemberRepository.getListMembers({
      listId,
      userId,
    });
    return listMembers;
  }

  static async deleteMemberFromList({ listId, userToRemoveId, requesterId }) {
    console.log({ listId, userToRemoveId, requesterId });
    const requester = await ListMemberRepository.getMemberByUserId({
      listId,
      userId: requesterId,
    });
    if (!requester || !["owner", "admin"].includes(requester.role)) {
      throw new AppError("Not Authorized", 403);
    }
    const memberToRemove = await ListMemberRepository.getMemberById({
      memberId: userToRemoveId,
    });
    console.log(memberToRemove);
    if (!memberToRemove) {
      throw new AppError("Member not found", 404);
    }
    if (memberToRemove.role == "owner") {
      throw new AppError("Cannot remove the owner", 403);
    }
    const deleteUser = await ListMemberRepository.deleteUserFromList({
      userToRemoveId,
    });
    return deleteUser;
  }

  static async patchMemberFromList({ listId, memberId, userId, role }) {
    const requester = await ListMemberRepository.getMemberByUserId({
      listId,
      userId,
    });
    if (!requester || !["owner", "admin"].includes(requester.role)) {
      throw new AppError("Not authorized", 403);
    }
    const memberExists = await ListMemberRepository.getMemberById({
      memberId,
    });
    console.log(memberExists);
    if (!memberExists) {
      throw new AppError("Member not found", 403);
    }
    if (role.toLowerCase() === "owner") {
      throw new AppError("Can't assign that role.");
    }
    if (memberExists.role === "owner") {
      throw new AppError("You can't remove ownership.");
    }
    const updatedMember = await ListMemberRepository.patchMember({
      memberId,
      role,
    });
    return updatedMember;
  }
}
