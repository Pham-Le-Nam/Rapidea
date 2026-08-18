# Backend Clean Architecture

This backend is a NestJS adaptation of the supplied Go Clean Architecture reference. It remains one deployable modular monolith and preserves the existing REST API and Prisma schema.

## Dependency direction

```text
HTTP / Prisma / infrastructure / Nest composition
                       |
                       v
             application services
                       |
                       v
              domain types and ports
```

Inner layers must not import outer layers:

- `domain` must not import NestJS, Prisma, HTTP DTOs, adapters, or infrastructure.
- `application` may depend on domain repositories and application-owned outbound ports. It must not import concrete infrastructure or repository adapters.
- `adapters` translate HTTP or Prisma representations and depend inward on application/domain contracts.
- `infrastructure` owns framework and vendor implementations such as Prisma connections, JWT strategy, storage, mail, and content moderation.
- `infrastructure/nest` is the composition layer. Its modules bind repository and service tokens to concrete adapters.

## Source layout

```text
src/
|-- domain/
|   `-- <feature>/
|       |-- repositories/       # persistence ports required by the feature
|       `-- *.ts                # domain-owned values/enums
|
|-- application/
|   |-- <feature>/              # workflow/application services
|   `-- ports/                  # outbound storage, mail, moderation contracts
|
|-- adapters/
|   |-- http/
|   |   |-- controllers/        # REST delivery adapters
|   |   |-- dto/                # request validation/transport DTOs
|   |   `-- guards/             # HTTP authentication/authorization guards
|   `-- repository/
|       `-- prisma/             # implementations of domain repository ports
|
|-- infrastructure/
|   |-- ai/                     # external AI/moderation implementations
|   |-- auth/                   # Passport/JWT implementation
|   |-- database/prisma/        # Prisma connection and lifecycle
|   |-- mail/                   # email implementation
|   |-- storage/                # local and S3 implementations
|   `-- nest/
|       |-- modules/            # feature dependency composition
|       `-- app.module.ts       # application composition root
|
`-- main.ts                     # process/bootstrap entrypoint
```

Prisma schema and migrations remain under `prisma/`. They are deployment artifacts rather than domain code.

## Request flow

```text
request
  -> HTTP controller + validation DTO
  -> application service
  -> domain repository/outbound port
  -> Prisma or external-service adapter
  -> response
```

Controllers should parse transport input, call an application service, and shape the response. Workflow decisions belong in application services. Persistence details belong in Prisma repositories.

## Dependency injection

Repository interfaces live in `domain/<feature>/repositories`. Nest feature modules bind their tokens to Prisma implementations, for example:

```ts
{
    provide: 'PROJECT_REPOSITORY',
    useClass: PrismaProjectRepository,
}
```

Application-owned outbound ports use the same inversion rule. Current ports cover storage, mail, moderation, AI, payments, and authentication/OAuth integration under `application/ports`.

## Adding a feature

1. Define domain values and required repository interfaces in `domain/<feature>`.
2. Implement the workflow in `application/<feature>` using only inner contracts.
3. Add request DTOs and a thin controller under `adapters/http`.
4. Add a Prisma implementation under `adapters/repository/prisma` if persistence is needed.
5. Wire concrete dependencies in `infrastructure/nest/modules/<feature>.module.ts`.
6. Register the module in `infrastructure/nest/app.module.ts`.
7. Add application unit tests with mocked ports and adapter integration tests where appropriate.

## Validation

Before handing off a backend change, run:

```bash
npm run build
npm test -- --runInBand
```
