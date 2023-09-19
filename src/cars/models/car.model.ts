import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import { GearBoxes } from '@prisma/client';

@ObjectType({ description: 'Car' })
export class Car {
  id: number;

  @Field((type) => ID)
  vin: string;

  @Field()
  manufacturer: string; // turn this into a metadata table later

  @Field()
  modelDetails: string; // this could be a long string careful when adding it to db

  @Field(() => GearBoxes)
  gearBox: GearBoxes; // should be a metadata field as its automatic manual and other

  @Field()
  color: string;

  @Field()
  mielage: number;

  @Field({ nullable: true })
  firstRegistrationDate?: Date;
}

registerEnumType(GearBoxes, {
  name: 'GearBoxes',
});
