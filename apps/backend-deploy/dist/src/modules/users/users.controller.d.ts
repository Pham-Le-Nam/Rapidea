import { UsersService } from './users.service';
import { UpdateProfileDto } from './users-dto/update-profile.dto';
import { UpdatePayoutAccountDto } from './users-dto/update-payout-account.dto';
import { UpdateCreatorPromptDto } from './users-dto/update-creator-prompt.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(req: any): Promise<{
        profile: any;
    }>;
    updateCreatorPrompt(req: any, dto: UpdateCreatorPromptDto): Promise<{
        creatorPrompt: string | null;
    }>;
    getPayoutAccount(req: any): Promise<{
        payoutAccount: any;
    }>;
    updatePayoutAccount(req: any, updatePayoutAccountDto: UpdatePayoutAccountDto): Promise<{
        payoutAccount: any;
    }>;
    getProfile(username: string, req: any): Promise<{
        profile: any;
        viewerId: any;
        profileId: any;
    }>;
    getProfileById(id: string, req: any): Promise<{
        profile: any;
        viewerId: any;
        profileId: any;
    }>;
    editProfile(username: string, req: any, updateProfileDto: UpdateProfileDto): Promise<any>;
}
