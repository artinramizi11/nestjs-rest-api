import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

// ADDED THIS AUTHENTIFICATION TO PRACTICE
@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){}