## Quick Start

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Bun](https://bun.com) — Fast all-in-one JavaScript runtime

### Installation

Install the project dependencies using bun:

```sh
bun install
```

### Git Hooks Setup (New Repository)

If you are setting up a new repository, initialize Husky:

```sh
bunx husky init
```

Then edit the generated `.husky/pre-commit` file:

```shell
bunx lint-staged
```

### Environment Variables

Copy the file named `.env.example` and rename it `.env.development` in the root of your project and replace the placeholder values with yours.

```sh
cp .env.example .env.development
```

### Running the Project

```sh
bun run start:dev
```

---

## Scripts Reference

| Script               | Description                                     |
| -------------------- | ----------------------------------------------- |
| `bun run start:dev`  | Start with watch mode                           |
| `bun run type:check` | TypeScript type-checking without emitting files |
| `bun run format`     | Format all files with Prettier                  |
| `bun run lint:fix`   | Run ESLint with auto-fix                        |
