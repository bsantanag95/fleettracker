export const Roles = {
  ADMIN: "admin",
  OPERATOR: "operator",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
