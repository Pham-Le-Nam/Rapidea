import { IsInt, IsString, IsOptional } from 'class-validator';

export class UpdateProfileDto {
    @IsString()
    @IsOptional()
    username: string;
    
    @IsString()
    @IsOptional()
    firstname?: string;
    
    @IsString()
    @IsOptional()
    lastname? : string;
    
    @IsString()
    @IsOptional()
    middlename? : string;
    
    @IsInt()
    @IsOptional()
    avatarId?: number | null;
    
    @IsInt()
    @IsOptional()
    backgroundId?: number | null;
    
    @IsString()
    @IsOptional()
    headline?: string;
    
    @IsString()
    @IsOptional()
    bio?: string
}

