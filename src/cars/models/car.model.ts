import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType({ description: 'Car' })
export class Car {
  id: string;

  @Field((type) => ID)
  vin: string;

  @Field()
  manufacturer: string; // turn this into a metadata table later

  @Field()
  modelDetails: string; // this could be a long string careful when adding it to db

  @Field()
  gearBox: string; // should be a metadata field as its automatic manual and other

  @Field()
  color: string;

  @Field()
  mielage: number;

  @Field({ nullable: true })
  firstRegistrationDate?: Date;
}
