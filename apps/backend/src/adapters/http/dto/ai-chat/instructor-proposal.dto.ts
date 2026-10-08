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
import {
  InstructorProposalKind,
  INSTRUCTOR_PROPOSAL_LIMITS as limits,
} from '../../../../application/instructor-ai/instructor-proposal';
class ProposalItemDto {
  @IsString() @MinLength(1) @MaxLength(limits.itemTitle) title: string;
  @IsString() @MaxLength(limits.itemDetails) details: string;
}
class ReviewedProposalDto {
  @IsEnum(InstructorProposalKind) kind: InstructorProposalKind;
  @IsString() @MinLength(1) @MaxLength(limits.title) title: string;
  @IsString() @MaxLength(limits.body) body: string;
  @IsArray()
  @ArrayMaxSize(limits.items)
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
