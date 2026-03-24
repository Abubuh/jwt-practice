import { ListMembersService } from "../services/list-member.service.js";

export const addMemberController = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const requesterId = req.user.userId; // quien está haciendo la petición
    const { userId, role } = req.body;

    const member = await ListMembersService.addMemberService({
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
    const members = await ListMembersService.getListMembers({ listId, userId });
    return res.status(200).json({
      ok: true,
      message: "Member found",
      data: members,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMember = async (req, res, next) => {
  try {
    const listId = req.params.listId;
    const userToRemoveId = req.params.memberId;
    const requesterId = req.user.userId;
    const deletedUser = await ListMembersService.deleteMemberFromList({
      listId,
      userToRemoveId,
      requesterId,
    });
    res.status(200).json({
      ok: true,
      message: "Member deleted",
      data: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const patchListMemberController = async (req, res, next) => {
  try {
    const { role } = req.body;
    const { listId, memberId } = req.params;
    const userId = req.user.userId;
    const patchedMember = await ListMembersService.patchMemberFromList({
      listId,
      memberId,
      userId,
      role,
    });
    res.status(200).json({
      ok: true,
      message: "Member patched",
      data: patchedMember,
    });
  } catch (error) {
    next(error);
  }
};
