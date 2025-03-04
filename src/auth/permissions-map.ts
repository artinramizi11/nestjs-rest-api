import { Permission } from "src/enums/permission.enum";
import { Role } from "src/enums/role.enum";

export const RolesPermissions = {
    [Role.Admin]: [Permission.Read,Permission.Post,Permission.Delete,Permission.Update],
    [Role.User]: [Permission.Read]
}
