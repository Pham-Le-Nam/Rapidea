import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdatePayoutAccountDto {
    @IsString()
    @IsOptional()
    accountHolderName?: string;

    @IsString()
    @IsOptional()
    country?: string;

    @IsString()
    @IsOptional()
    currency?: string;

    @IsString()
    @IsOptional()
    payoutMethod?: string;

    @IsString()
    @IsOptional()
    bankName?: string;

    @IsString()
    @IsOptional()
    routingNumber?: string;

    @IsString()
    @IsOptional()
    accountNumber?: string;

    @IsEmail()
    @IsOptional()
    paypalEmail?: string;

    @IsString()
    @IsOptional()
    taxResidency?: string;

    @IsString()
    @IsOptional()
    businessType?: string;
}
