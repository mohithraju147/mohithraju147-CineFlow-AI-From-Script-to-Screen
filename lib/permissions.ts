import { Role } from "@prisma/client";

const roleRank: Record<Role, number> = {
  SUPER_ADMIN: 6,
  PRODUCER: 5,
  DIRECTOR: 4,
  EDITOR: 3,
  CREW_MEMBER: 2,
  ACTOR: 1
};

export function canManage(role?: Role | null) {
  return role === "SUPER_ADMIN" || role === "PRODUCER" || role === "DIRECTOR";
}

export function canDelete(role?: Role | null) {
  return role === "SUPER_ADMIN" || role === "PRODUCER";
}

export function hasRole(role: Role | undefined | null, minimum: Role) {
  if (!role) return false;
  return roleRank[role] >= roleRank[minimum];
}
