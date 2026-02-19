import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
    @IsEmail()
    Email: string;

    @MinLength(6)
    Password: string;
}
