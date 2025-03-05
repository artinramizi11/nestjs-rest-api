import { SetMetadata } from "@nestjs/common";
import { Role } from "src/enums/role.enum";

export const roles_key = 'roles'
// Creating a decorator using SetMetadata to store metadata so we can manipulate with custom guards we make
export const Roles = (...roles: Role[]) => SetMetadata(roles_key,roles)
