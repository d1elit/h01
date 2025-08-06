import {VideoInputDto} from '../dto/video.input-dto'
import { ValidationError } from '../types/validationError';
import {availableResolutions} from "../types/video";

export const videoInputDtoValidation = (data:VideoInputDto): ValidationError[] => {
    const errors: ValidationError[] = [];

    if(!data.title || typeof data.title !== 'string')
    {
        errors.push({ field: 'title', message: 'Invalid title' });
    }
    if(!data.author || typeof data.author !== 'string')
    {
        errors.push({ field: 'author', message: 'Invalid author' });
    }
    if (
        data.canBeDownloaded !== false &&
        (!data.canBeDownloaded || typeof data.canBeDownloaded !== 'boolean')
    )
    {
        errors.push({ field: 'canBeDownloaded', message: 'Invalid value of canBeDownloaded' });
    }
    if(
        data.minAgeRestriction !== null &&
        (
            typeof data.minAgeRestriction !== 'number' ||
            data.minAgeRestriction < 1 ||
            data.minAgeRestriction > 18
        )
    )
    {
        errors.push({ field: 'minAgeRestriction', message: 'Invalid minAgeRestriction' });
    }
    if (!Array.isArray(data.availableResolutions)) {
        errors.push({
            field: 'availableResolutions',
            message: 'availableResolutions must be array',
        });
    } else if (data.availableResolutions.length) {
        const existingRes = Object.values(availableResolutions);
        if (
            data.availableResolutions.length > existingRes.length ||
            data.availableResolutions.length < 1
        ) {
            errors.push({
                field: 'availableResolutions',
                message: 'Invalid availableResolutions',
            });
        }
        for (const resolution of data.availableResolutions) {
            if (!existingRes.includes(resolution)) {
                errors.push({
                    field: 'resolutions',
                    message: 'Invalid availableResolutions:' + resolution,
                });
                break;
            }
        }
    }

    return errors
}