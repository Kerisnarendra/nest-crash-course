import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomException extends HttpException {
    constructor() {
        super('Forbidden', HttpStatus.FORBIDDEN)
    }
}