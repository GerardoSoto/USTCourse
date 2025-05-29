    import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

    @Injectable()
    export class TrimPipe implements PipeTransform {
      transform(value: any, metadata: ArgumentMetadata) {
        if (typeof value === 'object' && value !== null) {
          this.trimObject(value);
        }
        return value;
      }

      private trimObject(obj: any) {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'string') {
              obj[key] = obj[key].trim();
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
              this.trimObject(obj[key]); // Recursive call for nested objects
            }
          }
        }
      }
    }