import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class CustomPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log(`Custom pipe transform ${value} ${JSON.stringify(metadata)}`)
        return value;
    }
}
