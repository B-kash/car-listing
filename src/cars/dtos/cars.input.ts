import { InputType, Field } from '@nestjs/graphql';
import { GearBoxes } from '@prisma/client';

@InputType()
export class CarInput {
  @Field()
  vin: string;

  @Field({ nullable: true })
  manufacturer: string; // turn this into a metadata table later

  @Field({ nullable: true })
  modelDetails: string; // this could be a long string careful when adding it to db

  @Field(() => GearBoxes, { nullable: true })
  gearBox: GearBoxes; // should be a metadata field as its automatic manual and other

  @Field({ nullable: true })
  color: string;

  @Field({ nullable: true })
  mielage: number;

  @Field({ nullable: true })
  firstRegistrationDate?: Date;
}
