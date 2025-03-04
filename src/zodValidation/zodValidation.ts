import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema){}
    transform(value: any, metadata: ArgumentMetadata) {
        const parsed = this.schema.safeParse(value)
        if(!parsed.success) {
            throw new BadRequestException(parsed.error.format())
        }
        return parsed.data;
    }
}