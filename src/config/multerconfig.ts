import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import { existsSync, mkdirSync } from "node:fs";

export const multerConfig: MulterOptions = {
    storage: diskStorage({
        destination: (req, file, cb) => {
            const destinationName = "./src/uploads/";

            if (!existsSync(destinationName)) {
                mkdirSync(destinationName, { recursive: true });
            }
            cb(null, destinationName);
        },
        filename: (req, file, cb) => {
            const filepath = `./src/uploads/${file.originalname}`
            if(existsSync(filepath)){
                return cb(new BadRequestException("This file already exists"), file.originalname)
            }
            return cb(null, file.originalname);
        },
    }),
    fileFilter: (req,file,cb) => {
     
        if(file.mimetype.match(/(jpg|jpeg|png|pdf)$/i)) {

            return cb(null,true)

         
        } else {
            return cb(new HttpException("This file is unsupported",HttpStatus.BAD_REQUEST), false)
        }
    },
    limits: {
        files: 1,
        fileSize: (1024 * 1024) / 2 // 500kb
    }
     
}