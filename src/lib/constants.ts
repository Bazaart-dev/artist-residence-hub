// src/lib/constants.ts
export const ADMIN_ROLES = {
  admin: { value: "admin", label: "Administrateur" },
  editor: { value: "editor", label: "Éditeur" },
  viewer: { value: "viewer", label: "Visualiseur" }
} as const;

export type AdminRole = keyof typeof ADMIN_ROLES;
export const ALLOWED_ROLES = Object.keys(ADMIN_ROLES) as AdminRole[];
