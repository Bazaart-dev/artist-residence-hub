export const ADMIN_ROLES = {
  admin: { 
    value: "admin", 
    label: "Administrateur",
    level: 3
  },
  editor: { 
    value: "editor", 
    label: "Éditeur",
    level: 2
  },
  viewer: { 
    value: "viewer", 
    label: "Visualiseur",
    level: 1
  }
} as const;

export type AdminRole = keyof typeof ADMIN_ROLES;
export const ALL_ADMIN_ROLES = Object.keys(ADMIN_ROLES) as AdminRole[];
