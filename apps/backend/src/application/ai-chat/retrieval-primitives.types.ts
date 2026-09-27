import { Difficulty } from '../../../generated/prisma/enums';
import { HybridContentSearchInput } from './hybrid-content-search.types';

export type CourseSearchInput = {
    query: string;
    desiredSkills?: readonly string[];
    desiredOutcomes?: readonly string[];
    difficulty?: Difficulty;
    limit?: number;
};

export type CourseSearchResult = {
    id: string;
    title: string;
    description: string | null;
    price: number;
    currency: string;
    rating: number;
    ratingCount: number;
    subscribersCount: number;
    creator: {
        username: string;
        firstname: string;
        middlename: string | null;
        lastname: string;
    };
    profile: {
        summary: string;
        difficulty: Difficulty;
        profileText: string;
        profileVersion: number;
        generatedAt: Date;
    } | null;
    skills: Array<{
        id: number;
        name: string;
        description: string | null;
        outcome: string;
        importance: number;
    }>;
    tags: string[];
    semanticScore: number | null;
    keywordScore: number | null;
    combinedScore: number;
};

export type ContentSearchInput = HybridContentSearchInput;
