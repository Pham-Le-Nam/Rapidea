# Frontend Architecture

This React/Vite application adapts the feature-first, clean-boundary architecture from `Group_Productivity_Frontend_Architecture.docx`. Expo- and React Native-specific recommendations are intentionally replaced by their web equivalents.

## Dependency direction

```text
app -> features -> shared
          |
          +------> feature public APIs
providers -------> shared
config ----------> no product feature
```

- `app/` owns browser routing, layouts, navigation, and top-level composition.
- `features/` owns product behavior, feature screens, feature components, models, and deliberate API surfaces.
- `shared/` owns generic UI, the configured HTTP client, storage wrappers, hooks, and business-agnostic utilities.
- `providers/` initializes cross-cutting runtime state.
- `config/` validates and exposes environment configuration.
- Reusable domain entities should be introduced under `entities/` when a model is genuinely shared by multiple features. Empty scaffolding is not created in advance.

## Source layout

```text
src/
|-- app/
|   |-- components/
|   |-- layouts/
|   |-- routes/
|   `-- App.tsx
|-- features/
|   |-- admin/
|   |-- auth/
|   |-- chat/
|   |-- courses/
|   |-- files/
|   |-- home/
|   |-- notifications/
|   |-- posts/
|   |-- profile/
|   |-- settings/
|   `-- tags/
|-- providers/
|-- shared/
|   |-- api/
|   |-- components/
|   |-- hooks/
|   |-- lib/
|   `-- storage/
|-- config/
|-- main.tsx
`-- index.css
```

## Conventions

1. Route declarations stay in `app/routes` and only compose feature screens.
2. Cross-feature UI imports use a feature's root `index.ts` public surface.
3. A feature imports its API methods through its own `api/index.ts` surface.
4. Generic UI imports come from `shared/components`; product-specific UI stays in a feature.
5. Environment access is centralized in `config/env.ts`.
6. Media URL construction is centralized in `shared/lib/media.ts`.
7. Authentication persistence is accessed through `shared/storage/authToken.ts`.
8. The shared Axios client owns base URL configuration and authentication headers.
9. Server-authoritative calculations remain on the backend; frontend code formats and presents returned results.
10. New feature folders and entity layers are created only when real implementation requires them.

## Adding a feature

Use only the subfolders the feature needs:

```text
features/example/
|-- api/
|-- components/
|-- hooks/
|-- model/
|-- screens/
|-- validation/
`-- index.ts
```

Expose screens and reusable feature components through `index.ts`. Keep internal helpers private unless another layer has a demonstrated need for them.
