import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions } from "@nestjs/jwt";

export const jwtConfig: JwtModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
        global: true ,
        secret: config.get("SECRET_KEY"),
        signOptions: {expiresIn: config.get("JWT_DEFAULT_EXPIRES")}
    })
}