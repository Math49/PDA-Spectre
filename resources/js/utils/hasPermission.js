export const hasPermission = (auth, permission) => {
    return auth.user.permissions.includes(permission);
}