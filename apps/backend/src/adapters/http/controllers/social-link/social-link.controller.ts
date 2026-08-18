import { Controller, 
    UseGuards, 
    Get, 
    Param, 
    Request,
    Post, 
    Body,
    InternalServerErrorException,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../guards/auth/jwt.guard";
import { SocialLinkService } from "../../../../application/social-link/social-link.service";
import { UsersService } from "../../../../application/users/users.service";
import { AddSocialLinkDto } from "../../dto/social-link/add-social-link.dto";
import { SocialPlatform } from "../../../../domain/social-link/social-platform.enum";
import { platform } from "os";
import { UpdateSocialLinkDto } from "../../dto/social-link/update-social-link.dto";

@Controller('api/social-link')
export class SocialLinkController {
    constructor (
        private readonly socialLinkService: SocialLinkService,
        private readonly usersService: UsersService,
    ) {}

    @Get(':username')
    async getSocialLinks(
        @Param('username') username: string,
    ) {
        const user = await this.usersService.getUserByUsername(username);

        const socialLinks = await this.socialLinkService.findSocialLinksByUserId(user.id)

        return {
            socialLinks,
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addSocialLink (
        @Request() req: any,
        @Body() addSocialLinkDto: AddSocialLinkDto,
    ) {
        const viewer = req.user;
        // Convert a string into a SocialPlatform
        const socialPlatform = addSocialLinkDto.platform as SocialPlatform;
        
        const socialLink = await this.socialLinkService.createSocialLink(
            socialPlatform,
            addSocialLinkDto.url,
            viewer.userId,
        );

        return {
            socialLink,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    async updateSocialLink (
        @Request() req: any,
        @Body() updateSocialLinkDto: UpdateSocialLinkDto,
    ) {
        const viewer = req.user;
        
        const socialLink = await this.socialLinkService.findSocialLinkById(updateSocialLinkDto.id);

        if (viewer.userId != socialLink.userId) {
            throw new InternalServerErrorException("Couldn't update other users' social link");
        }

        const updatedSocialLink = await this.socialLinkService.updateSocialLinkById(
            updateSocialLinkDto.id,
            updateSocialLinkDto.url,
        );

        return {
            socialLink: updatedSocialLink,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async deleteSocialLink (
        @Request() req: any,
        @Body() data: {id: string},
    ) {
        const viewer = req.user;
        
        const socialLink = await this.socialLinkService.findSocialLinkById(data.id);

        if (viewer.userId != socialLink.userId) {
            throw new InternalServerErrorException("Couldn't delete other users' social link");
        }

        const deletedSocialLink = await this.socialLinkService.deleteSocialLinkById(
            data.id,
        );

        return {
            socialLink: deletedSocialLink,
        };
    }
}