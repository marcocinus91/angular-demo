# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This is a freshly scaffolded Angular CLI (v22) application with SSR enabled. It has not yet
diverged from the generated starter beyond a simplified root component — there is no established
feature architecture to follow yet. When adding functionality, follow standard Angular 22
conventions (standalone components, no NgModules) rather than inferring patterns from existing code.

## Commands

- `npm start` / `ng serve` — dev server at `http://localhost:4200/`, live reload on source changes.
- `ng build` — production build, output to `dist/`. Use `ng build --configuration development` for
  an unoptimized build with source maps.
- `npm run watch` — build in watch mode with the development configuration.
- `ng test` — run unit tests via Vitest (configured through `@angular/build:unit-test`, not Karma).
  Uses `jsdom` as the test environment.
- `npm run serve:ssr:angular-demo` — run the built SSR server (`node dist/angular-demo/server/server.mjs`),
  requires `ng build` first.
- `ng generate component <name>` — scaffold a new standalone component. `ng generate --help` lists
  all available schematics.

There is no e2e test framework configured.

## Architecture

- **Standalone, no NgModules.** `src/main.ts` bootstraps the root `App` component directly with
  `appConfig` from `src/app/app.config.ts`.
- **SSR / hybrid rendering** is set up via `@angular/ssr`:
  - `src/app/app.config.ts` — browser-side providers (router, client hydration via `provideClientHydration()`).
  - `src/app/app.config.server.ts` — merges `appConfig` with server providers (`provideServerRendering`).
  - `src/app/app.routes.server.ts` — per-route render mode config for the server (`RenderMode`); currently
    all routes (`**`) are set to `Prerender`. Add entries here when introducing routes that need SSR or
    client-side rendering instead of prerendering.
  - `src/server.ts` — the Express entry point used both by the Angular CLI dev/build tooling and for
    standalone serving. `AngularNodeAppEngine` handles rendering; static assets are served from `../browser`.
    Add custom Express API routes here (there's a commented example showing the pattern), before the
    catch-all Angular handler.
  - `src/main.server.ts` — server bootstrap function used by the SSR engine.
- **Routing**: `src/app/app.routes.ts` defines the Angular `Routes` array (currently empty) used by
  `provideRouter(routes)` in `app.config.ts`. Any new route must be added both here and, if it should not
  simply be prerendered, in `app.routes.server.ts`.
- Angular CLI project config (build targets, budgets, asset globs) lives in `angular.json`. Production
  builds enforce bundle budgets (500kB warning / 1MB error initial; 4kB/8kB per-component styles).

## Code style

- Single quotes, 2-space indentation (`.editorconfig`, `.prettierrc`).
- Prettier `printWidth: 100`; `.html` files use the Angular parser.
