import { Injectable, Inject, InternalServerErrorException } from '@nestjs/common';
import { PostInCourseRepository } from './post-in-course.repository';

@Injectable()
export class PostInCourseService {
    constructor(
        @Inject('POST_IN_COURSE_REPOSITORY')
        private readonly postInCourseRepo: PostInCourseRepository,
    ) {}

    async addPostToCourse (courseId: string, postId: string, userId: string) {
        const postInCourse = await this.postInCourseRepo.create(courseId, postId, userId);
        return postInCourse;
    }

    async removePostFromCourse (courseId: string, postId: string, userId: string) {
        const deleted = await this.postInCourseRepo.delete(courseId, postId, userId);
        return deleted;
    }

    async removeAllPost (courseId: string) {
        const deletedPost = await this.postInCourseRepo.deleteCourse(courseId);
        return deletedPost;
    }

    async removeFromAllCourse (postId: string) {
        const deletedCourses = await this.postInCourseRepo.deletePost(postId);
        return deletedCourses;
    }

    async findPosts (courseId: string) {
        return this.postInCourseRepo.findByCourseId(courseId);
    }

    async findCourse (postId: string) {
        return this.postInCourseRepo.findByPostId(postId);
    }
}
