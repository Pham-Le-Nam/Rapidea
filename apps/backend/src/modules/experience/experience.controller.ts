import { Controller, 
    UseGuards, 
    Get, 
    Param, 
    Request, 
    NotFoundException, 
    Post, 
    Body,
    InternalServerErrorException,
} from "@nestjs/common";
import { OptionalJwtAuthGuard } from '../auth/optional-jwt.guard';
import { JwtAuthGuard } from "../auth/jwt.guard";
import { ExperienceService } from "./experience.service";
import { UsersService } from "../users/users.service";
import { AddExperienceDto } from "./experience-dto/add-experience.dto";
import { UpdateExperienceDto } from "./experience-dto/update-experience.dto";

@Controller('api/experience')
export class ExperienceController {
    constructor (
        private readonly experienceService: ExperienceService,
        private readonly userService: UsersService
    ){}

    @UseGuards(OptionalJwtAuthGuard)
    @Get(':username')
    async getExperience(
        @Param('username') username: string,
        @Request() req: any
    ) {
        const viewer = req.user;
        const owner = await this.userService.getUserByUsername(username);

        if(!owner) {
            throw new NotFoundException("User not found");
        }

        const experience = await this.experienceService.getExperienceByUserId(owner.id);

        if(!experience) {
            throw new NotFoundException("Experience not found");
        }

        return {
            experience,
            isOwner: viewer?.userId === owner.id,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addExperience(
        @Request() req: any,
        @Body() addExperienceDto: AddExperienceDto,
    ) {
        const user = req.user;

        const experience = await this.experienceService.createExperience(
            user.userId,
            addExperienceDto.name,
            addExperienceDto.position,
            addExperienceDto.role,
            addExperienceDto.startedAt,
            addExperienceDto.endedAt,
            addExperienceDto.location,
            addExperienceDto.achievement,
            addExperienceDto.logoId,
        );

        if (!experience) {
            throw new InternalServerErrorException("Couldn't add experience");
        }

        return this.experienceService.getExperienceByUserId(user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    async updateExperience(
        @Request() req: any,
        @Body() updateExperienceDto: UpdateExperienceDto,
    ) {
        const user = req.user;

        const experience = await this.experienceService.updateExperienceById(
            user.userId,
            updateExperienceDto.id,
            updateExperienceDto.name,
            updateExperienceDto.position,
            updateExperienceDto.role,
            updateExperienceDto.startedAt,
            updateExperienceDto.endedAt,
            updateExperienceDto.location,
            updateExperienceDto.achievement,
            updateExperienceDto.logoId,
        );

        if (!experience) {
            throw new InternalServerErrorException("Couldn't update experience");
        }

        return this.experienceService.getExperienceByUserId(user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete/')
    async deleteExperience(
        @Request() req: any,
        @Body() id: string,
    ) {
        const user = req.user;

        const deletedExperience = this.experienceService.deleteExperienceById(id, user.userId);

        if (!deletedExperience) {
            throw new InternalServerErrorException("Couldn't delete experience");
        }

        return this.experienceService.getExperienceByUserId(user.userId);
    }
}