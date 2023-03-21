import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.store.create({
    data: {
      cnpj: '04.646.343/0001-89',
      corporateReason: 'LOJA DE SUPLEMENTOS LTDA.',
      email: 'roberto.baptista2@caffeine.com.br',
      fantasyName: 'Loja de suplementos',
      phone: '(21) 981589321',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
