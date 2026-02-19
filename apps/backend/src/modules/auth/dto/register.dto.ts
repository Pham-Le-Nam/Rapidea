import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    Email: string;

    @MinLength(6)
    Password: string;

    @MinLength(6)
    ConfirmPassword: string;

    @IsString()
    Firstname: string;

    @IsString()
    Lastname: string;

    @IsString()
    Middlename: string;
}
