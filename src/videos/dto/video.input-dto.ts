import {availableResolutions} from "../types/video";

export type VideoInputDto = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean | false;
    minAgeRestriction: number | null;
    createdAt: Date;
    publicationDate: Date;
    availableResolutions: availableResolutions[];
}