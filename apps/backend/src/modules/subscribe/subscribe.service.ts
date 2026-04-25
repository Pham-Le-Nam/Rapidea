import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SubscribeRepository } from './subscribe.repository';

@Injectable()
export class SubscribeService {
    constructor(
        @Inject('SUBSCRIBE_REPOSITORY')
        private readonly subscribeRepo: SubscribeRepository,
    ) {}

    async subscribeCourse(courseId: string, userId: string) {
        const existingSubscription = await this.subscribeRepo.getSubscription(courseId, userId);

        if (existingSubscription) {
            return existingSubscription;
        }

        const subscription = await this.subscribeRepo.create(courseId, userId);

        if (!subscription) {
            throw new InternalServerErrorException("Couldn't subscribe to course");
        }

        return subscription;
    }

    async getSubscription(courseId: string, userId: string) {
        return this.subscribeRepo.getSubscription(courseId, userId);
    }
}
