# Rapidea backend

NestJS modular monolith organized with Clean Architecture boundaries.

## Commands

```bash
npm install
npm run start:dev
npm run build
npm test -- --runInBand
```

Production startup applies the checked-in Prisma migrations before launching the compiled API:

```bash
npm run start:prod
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) before adding or moving backend code.
