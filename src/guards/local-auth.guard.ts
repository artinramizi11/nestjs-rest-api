import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

// Added another authentication guard for practice
@Injectable()
// We just renaming the default passport local auth guard name to a custom name 
export class LocalAuthGuard extends AuthGuard('local'){}