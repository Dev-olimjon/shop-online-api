import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorater";
@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private reflactor: Reflector) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflactor.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])
            if (!requiredRoles) {
                return true
            }
            const req = context.switchToHttp().getRequest()
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException();
            }
            const user = this.jwtService.verify(token)
            req.user = user;
            if(user.role === 'ADMIN'){
                return true
            }
            return false
        }
        catch (e) {
            console.log(e)
            throw new UnauthorizedException();
        }
    }

}