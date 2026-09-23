export enum AiContentAccessMode {
    SUMMARY = 'SUMMARY',
    DETAILS = 'DETAILS',
}

export enum AiContentResourceType {
    COURSE = 'COURSE',
    POST = 'POST',
    FILE = 'FILE',
    DISCUSSION = 'DISCUSSION',
    REVIEW = 'REVIEW',
}

export type AiContentResourceReference = {
    type: AiContentResourceType;
    id: string;
};
