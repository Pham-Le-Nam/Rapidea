import { IsInt, IsString, IsDate, IsOptional } from 'class-validator';

export class UpdateProfileDto {
    @IsString()
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
    avatarId?: number;
    
    @IsInt()
    @IsOptional()
    backgroundId?: number;
    
    @IsString()
    @IsOptional()
    headline?: string;
    
    @IsString()
    @IsOptional()
    bio?: string
}

