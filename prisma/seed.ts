import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.car.createMany({
    data: [
      {
        vin: 'W1K1770841V096003',
        manufacturer: 'Mercedes-Benz',
        modelDetails: 'A -Klasse (BM 177)(03.2018->)',
        gearBox: 'AUTOMATIC',
        color: 'NACHTSCHWARZ - UNILACK',
        mielage: 29831,
        firstRegistrationDate: new Date('2022-10-14'),
      },
      {
        vin: 'WV2ZZZEB4PH029896',
        manufacturer: 'Volkswagen',
        modelDetails: 'ID.Buzz Bus (EB)(2022->)',
        gearBox: 'OTHER',
        color: 'Starlight Blue Metallic',
        mielage: 7854,
        firstRegistrationDate: new Date('2022-03-01'),
      },
      {
        vin: 'WAUZZZFY2N2005515',
        manufacturer: 'Audi',
        modelDetails: 'Q5 Sportback (FYT)(11.2020->)',
        gearBox: 'AUTOMATIC',
        color: 'Navarrablau Metallic',
        mielage: 14569,
        firstRegistrationDate: new Date('2022-12-14'),
      },
      {
        vin: 'VSSZZZKLXPR030121',
        manufacturer: 'Cupra',
        modelDetails: 'Leon (KL1)(09.2020->)',
        gearBox: 'AUTOMATIC',
        color: 'Graphengrau',
        mielage: 10,
      },
      {
        vin: 'WBA4E91020G794414',
        manufacturer: 'BMW',
        modelDetails: 'Serie 4 Gran Coupe (F36)(2014->)',
        gearBox: 'AUTOMATIC',
        color: 'IMPERIALBLAU BRILLANTEFFEKT METALLI',
        mielage: 85545,
        firstRegistrationDate: new Date('2022-08-24'),
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log({ err: e });
    await prisma.$disconnect();
    process.exit(1);
  });
