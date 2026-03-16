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
import { EducationService } from "./education.service";
import { UsersService } from "../users/users.service";
import { AddEducationDto } from "./education-dto/add-education.dto";
import { UpdateEducationDto } from "./education-dto/update-education.dto";

@Controller('api/education')
export class EducationController {
    constructor (
        private readonly educationService: EducationService,
        private readonly userService: UsersService
    ){}

    @UseGuards(OptionalJwtAuthGuard)
    @Get(':username')
    async getEducations(
        @Param('username') username: string,
        @Request() req: any
    ) {
        const viewer = req.user;
        const owner = await this.userService.getUserByUsername(username);

        if(!owner) {
            throw new NotFoundException("User not found");
        }

        const education = await this.educationService.getEducationByUserId(owner.id);

        if(!education) {
            throw new NotFoundException("Education not found");
        }

        return {
            education,
            isOwner: viewer?.userId === owner.id,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addEducation(
        @Request() req: any,
        @Body() addEducationDto: AddEducationDto,
    ) {
        const user = req.user;

        const education = await this.educationService.createEducation(
            user.userId,
            addEducationDto.name,
            addEducationDto.major,
            addEducationDto.degree,
            addEducationDto.startedAt,
            addEducationDto.endedAt,
            addEducationDto.location,
            addEducationDto.achievement,
            addEducationDto.logoId,
        );

        if (!education) {
            throw new InternalServerErrorException("Couldn't add education");
        }

        return this.educationService.getEducationByUserId(user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    async updateEducation(
        @Request() req: any,
        @Body() updateEducationDto: UpdateEducationDto,
    ) {
        const user = req.user;

        const education = await this.educationService.updateEducationById(
            user.userId,
            updateEducationDto.id,
            updateEducationDto.name,
            updateEducationDto.major,
            updateEducationDto.degree,
            updateEducationDto.startedAt,
            updateEducationDto.endedAt,
            updateEducationDto.location,
            updateEducationDto.achievement,
            updateEducationDto.logoId,
        );

        if (!education) {
            throw new InternalServerErrorException("Couldn't update education");
        }

        return this.educationService.getEducationByUserId(user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async deleteEducation(
        @Request() req: any,
        @Body('id') id: string,
    ) {
        const user = req.user;
        const userId = String(user.userId);
        const deletedEducation = this.educationService.deleteEducationById(id, userId);

        if (!deletedEducation) {
            throw new InternalServerErrorException("Couldn't delete education");
        }

        return this.educationService.getEducationByUserId(user.userId);
    }
}