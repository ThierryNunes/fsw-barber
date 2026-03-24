This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Create Project

npx create-next-app@14 project-name

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Prisma config using MySQL

First, run the install

```bash
npm i prisma@5.17.0 --save-dev

npm i @prisma/client @prisma/adapter-mariadb dotenv

npx prisma init --datasource-provider mysql
```

To run seeds, needs to:

```bash
add to package.json ->
"prisma": {
    "seed": "ts-node prisma/seed.ts"
}

install -> npm i -D ts-node

run -> npx prisma db seed
```

## Prettier with tailwindcss

First run install

```bash
npm install -D prettier prettier-plugin-tailwindcss

create on root prettierrc.json, paste in
{
  "plugins": ["prettier-plugin-tailwindcss"],
  "tabWidth": 2,
  "semi": false
}
```

## GIT Hooks

```bash
npm i -D husky lint-staged git-commit-msg-linter

npx husky init

Inside the folder .husky change file pre-commit paste in: npx lint-staged

Create on root .lintstagederc.json, paste in
{
"*.ts?(x)": ["eslint --fix", "prettier --write"]
}

- Create inside folder .husky -> commit-msg
  paste in:
  .git/hooks/commit-mgs $1
```
