import { SetMetadata } from "@nestjs/common";

export const OwnerShip = (userId: string) => SetMetadata("ownership",userId)