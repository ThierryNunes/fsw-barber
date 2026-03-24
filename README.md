This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## Create Project

npx create-next-app@14 project-name

## Prisma install using MySQL

npm i prisma@5.17.0 --save-dev
npm i @prisma/client @prisma/adapter-mariadb dotenv
npx prisma init --datasource-provider mysql

# GIT Hooks

npm i -D husky lint-staged git-commit-msg-linter

npx husky init

Dentro da pasta .husky alterar o pre-commit: npx lint-staged

Criar o arquivo .lintstagederc.json colar dentro:
{
"\*.ts?(x)": ["eslint --fix", "prettier --write"]
}

- Para travar prefixos no commit, criar arquivo dentro da pasta .husky: commit-msg
  colar dentro do arquivo:
  .git/hooks/commit-mgs $1
