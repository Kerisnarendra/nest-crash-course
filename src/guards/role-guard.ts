import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate {
    // constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        console.log(`Role guard canActivate ${context}`);
        return true;
        // const roles = this.reflector.get<string[]>('roles', context.getHandler());
        // if(!roles) {
        //     return true;
        // }
        // const request = context.switchToHttp().getRequest();
        // const user = request.user;        
        // return matchRoles(roles, user.roles);
    }
}

function matchRoles(roles: string[], roles1: any): boolean {
    // The logic inside the matchRoles() function can be as simple or sophisticated as needed
    return true;
}

