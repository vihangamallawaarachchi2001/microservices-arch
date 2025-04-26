// config.ts
let currentUserRole: "driver" | "restaurantOwner" = "driver";

export const setCurrentUserRole = (role: "driver" | "restaurantOwner") => {
  currentUserRole = role;
};

export const getCurrentUserRole = () => currentUserRole;
