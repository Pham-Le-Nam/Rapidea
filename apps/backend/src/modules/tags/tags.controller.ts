import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('api/tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Get()
    async getTags() {
        return this.tagsService.listTags();
    }

    @Post('suggest')
    async suggestTags(
        @Body() data: { text?: string; limit?: number },
    ) {
        return this.tagsService.suggestTags(data.text ?? '', data.limit ?? 5);
    }
}
