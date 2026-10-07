import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  Equals,
  IsArray,
  IsDefined,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { InstructorProposalKind } from '../../../../application/instructor-ai/instructor-proposal';
class ProposalItemDto {
  @IsString() @MinLength(1) @MaxLength(500) title: string;
  @IsString() @MaxLength(2000) details: string;
}
class ReviewedProposalDto {
  @IsEnum(InstructorProposalKind) kind: InstructorProposalKind;
  @IsString() @MinLength(1) @MaxLength(250) title: string;
  @IsString() @MaxLength(20000) body: string;
  @IsArray()
  @ArrayMaxSize(40)
  @ValidateNested({ each: true })
  @Type(() => ProposalItemDto)
  items: ProposalItemDto[];
}
export class ApplyInstructorProposalDto {
  @Equals(true) confirmed: boolean;
  @IsDefined()
  @ValidateNested()
  @Type(() => ReviewedProposalDto)
  proposal: ReviewedProposalDto;
}
