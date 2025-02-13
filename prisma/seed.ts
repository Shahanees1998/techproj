import { PrismaClient, Permission } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
      permissions: Object.values(Permission) // Admin has all permissions
    }
  });

  const managerRole = await prisma.role.upsert({
    where: { name: 'MANAGER' },
    update: {},
    create: {
      name: 'MANAGER',
      permissions: [
        Permission.READ_USER,
      ]
    }
  });

  const technicianRole = await prisma.role.upsert({
    where: { name: 'TECHNICIAN' },
    update: {},
    create: {
      name: 'TECHNICIAN',
      permissions: [
        Permission.READ_USER,
      ]
    }
  });

  const clientRole = await prisma.role.upsert({
    where: { name: 'CLIENT' },
    update: {},
    create: {
      name: 'CLIENT',
      permissions: [
        Permission.READ_USER,
      ]
    }
  });

  // Create initial admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'ali.arshad@vqode.com' },
    update: {},
    create: {
      email: 'ali.arshad@vqode.com',
      name: 'Ali Arshad',
      roleId: adminRole.id
    }
  });

  console.log({ adminRole, managerRole, technicianRole, clientRole, adminUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 