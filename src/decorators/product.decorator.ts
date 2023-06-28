import { createParamDecorator } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";

export const ProductDecorator = createParamDecorator(
    (data: unknown, ctx: ExecutionContextHost) => {
        const request = ctx.switchToHttp().getRequest();
        return request.body.product;
    }
)