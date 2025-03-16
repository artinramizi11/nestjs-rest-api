import { SetMetadata } from "@nestjs/common";

export const PublicHandler = () => SetMetadata("public",true)