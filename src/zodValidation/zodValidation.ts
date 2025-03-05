import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";

@Injectable()
// Creating custom validation pipe using zod schema to validate the request data
export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema){}
    transform(value: any, metadata: ArgumentMetadata) {
        // the value we get from the body after we use ZodValidationPipe with the zod schema's
        const parsed = this.schema.safeParse(value)
        if(!parsed.success) {
            throw new BadRequestException(parsed.error.format())
        }
        return parsed.data;
    }
}