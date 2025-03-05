import { SetMetadata } from "@nestjs/common"
import { Permission } from "src/enums/permission.enum"

export const permission_key = "permission_key"
export const Permissions = (...permissions: Permission[]) => SetMetadata(permission_key,permissions)