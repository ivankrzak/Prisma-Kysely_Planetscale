This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Introduction

Welcome to our NextJS template repository! This repository is built to streamline the creation of new NextJS projects, leveraging the power of version 13 and ensuring a smooth development experience.

## What is NextJS?

NextJS is a React Framework for production; it's a fast, scalable and flexible solution for applications that provides various advantages over traditional React setups.

## Why use NextJS?

- **Performance**: NextJS optimizes your application for performance by default. It supports server-side rendering and static site generation, resulting in faster load times and improved SEO.

- **Routing**: With file-system based routing, it's easy to create new pages. Each file in the 'pages' directory becomes a route automatically.

- **Versatility**: NextJS is versatile and allows for both server-side and static rendering. This means you can pre-render pages at build time or use server-side rendering for dynamic content.

- **Development Experience**: NextJS provides a fantastic developer experience with features like hot-code reloading, error reporting, and integration with many popular tools and libraries in the React ecosystem.

- **Zero Configuration**: NextJS requires zero configuration to start. It comes with its own Webpack setup and Babel configuration, so you don't have to worry about complex setup procedures.

This repository provides a basic template for NextJS projects, eliminating the need for repetitive setup and configuration tasks, and allowing you to jump straight into building your application.

# Prerequisites

Before you can work with this NextJS template, ensure that you have the following requirements set up on your system:

1. **Node.js**: This project requires Node.js version 18. You can download it from the [official Node.js website](https://nodejs.org/).

   Alternatively, we recommend using Node Version Manager (NVM) for managing multiple active Node.js versions. To install NVM, you can use the install script using cURL:

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
   ```

   Or with Wget:

   ```bash
   wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
   ```

   After installing NVM, you can install and use the required Node.js version by running:

   ```bash
   nvm install 18
   nvm use 18
   ```

   We have also included a `.nvmrc` file in the repository to help ensure that everyone working on the project is using the same version of Node.js. Once you have NVM installed, you can simply run `nvm use` in the project directory to switch to the correct Node.js version.

2. **Docker**: This project uses Docker for providing a consistent development environment. You can download Docker from the [official Docker website](https://www.docker.com/). Follow their instructions for installation on your specific operating system.

Remember to verify that your installations were successful by checking the versions of Node.js and Docker:

```bash
node --version
docker --version
```

With these prerequisites satisfied, you are ready to work with this NextJS template repository!

# Getting Started

Here are the step-by-step instructions to set up the project locally:

## Step 1: Install Node.js Dependencies

The specific version of Next.js that we are using supports a wide range of Node.js versions. To ensure compatibility, we highly recommend utilizing [fnm](https://github.com/Schniz/fnm), which is a fast Node.js version manager. To utilize the appropriate Node.js version, navigate to the root directory and run the command `fnm use`. This will switch to the version specified in the `.nvmrc` file.

In addition, you can configure fnm to automatically switch to the appropriate Node.js version when changing directories or opening a project. More information on how to accomplish this can be found [here](https://github.com/Schniz/fnm#zsh).

Next, install the project dependencies. While you can use npm, this project prefers `yarn` for managing dependencies. If you don't have `yarn` installed, you can install it with the following command:

```bash
npm install --global yarn
```

Once you have `yarn` installed, you can install the project dependencies with the following command:

```bash
yarn install
```

This command reads the `package.json` file and installs all the necessary dependencies.

## Step 2: Start the Development Server

With the dependencies installed, you can now start the development server. This command also starts up the Next.js application:

```bash
yarn dev
```

Next.js application should now be running! Open your web browser and navigate to `http://localhost:3000` to see your application in action.

With these steps, you've successfully set up the NextJS template on your local machine. Happy coding!

# Project Structure

This NextJS template follows a standard project structure to ensure that it's easy to navigate and understand. Here's a brief overview of the directory structure and the purpose of each folder and file:

```
nextjs-template/
├── .next/
├── .storybook/
│   ├── i18next.ts
│   ├── main.js
│   ├── preview.js
│   └── ProvidersDecorator.tsx
├── node_modules/
├── prisma/
│   └── schema.prisma
├── public/
│   ├── assets/
│   └── locales/
│       ├── en/
│       └── sk/
├── src/
│   ├── api/
│   │   ├── models/
│   │   ├── resolvers/
│   │   └── services/
│   ├── apollo/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── theme/
│   └── utils/
├── .env.local
├── .gitignore
├── next.config.js
├── package.json
├── README.md
├── yarn.lock
└── @types/
    └── i18next.d.ts

```

- **`.storybook/`**: This directory contains the configuration for Storybook. It includes the main configuration file (`main.js`), a preview file (`preview.js`) that configures the context in which your stories run, a decorator for your providers (`ProvidersDecorator.tsx`), and an `i18next.ts` file to set up i18n in Storybook.

- **`.next/`**: This directory contains the result of the Next.js build process and is automatically generated. It should not be committed to version control.

- **`node_modules/`**: This directory is where all the modules of the code that your project depends on (npm packages) are automatically installed.

- **`prisma/`**: This directory contains Prisma setup files, including the Prisma schema file `schema.prisma`. Prisma is an open-source database toolkit that is used in this project as an Object-Relational Mapping (ORM) tool. The `schema.prisma` file is used to define your database schema - tables are defined as models within this file. After defining your schema, Prisma Client can be generated and used in your application for type-safe database access.

- **`public/`**: This directory is used by Next.js as the base path when defining static assets.

  - `assets/` subdirectory can be used to store images, fonts, and other static files.
  - `locales/`: subdirectory contains the localization files for English (`en/`) and Slovak (`sk/`). These localization files are used by i18next to provide translated text throughout the application.

- **`src/`**: This directory contains the source code for your Next.js application. It includes the following subdirectories:

  - `api/`: This directory contains the core business logic of the application, which is structured around the GraphQL API. It includes GraphQL schema, custom resolvers, and services.

    - `graphql/`: This directory contains GraphQL schemas. Each schema file should be imported in the `index.ts` file.
    - `resolvers/`: This directory contains GraphQL resolvers. Each resolver file defines the operations allowed for a particular type, such as fetching, creating, updating, and deleting. **Each new resolver should be registered in `index.ts`**
    - `services/`: This directory should be used for defining custom business logic. It contains two important files:
      - `loggerService.ts`: This file sets up a `pino` logger, which is a very low-overhead Node.js logger. It includes a destination stream for Sentry, an error tracking tool that helps developers monitor and fix crashes in real time. The logger's level and streams are configured based on the environment variables.

  - `apollo/`: This directory is used to store anything related to the Apollo GraphQL client. From schema, errors, to the client initialization.

  - `components/`: This directory is used to store reusable React components.

  - `hooks/`: This directory is used for custom React hooks. Hooks are a feature introduced in React 16.8 that allow you to use state and other React features without writing a class. In this folder, you can define your custom hooks that can be reused across multiple components in your application. This promotes code reuse and a more functional approach to writing components.

  - `pages/`: This directory is used by Next.js for its built-in routing system. Each file in this directory becomes a route that gets automatically processed and rendered.

  - `styles/`: This directory is used for CSS Modules. Each `.css` file here corresponds to a React component in the `components/` directory.

  - `utils/`: This directory can be used for utility functions and hooks that are used across your application.

- **`.env.local`**: This file is where you can put environment variables that should be available to your Next.js application. It should not be committed to version control.

- **`.gitignore`**: This file specifies which files and directories should be ignored by Git.

- **`next.config.js`**: This file is used for customizing the Next.js configuration.

- **`package.json`**: This file is used by npm to store metadata for projects and to manage project dependencies.

- **`README.md`**: This file contains the documentation for your project.

- **`yarn.lock`**: This file is automatically generated by Yarn and is used to lock down the versions of the package dependencies to ensure consistency across environments.

- **`@types/`**: This directory is used for custom TypeScript type declarations. The `i18next.d.ts` file within this directory is used to define new translation namespaces for i18next.

Understanding this structure will make it easier for you to locate the files you need and understand where to place new files.

## Working with Prisma

Prisma is an open-source database toolkit that makes it easy to reason about database queries and schema definitions in your application.

### Defining a New Entity

To define a new entity (i.e., a new table in the database), you need to add a new model to your `schema.prisma` file. For example, to define a `User` entity, you would add the following:

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id     Int      @id @default(autoincrement())
  title  String
  author User?    @relation(fields: [authorId], references: [id])
  authorId Int
}
```

Each field in the model represents a field in the table, and the type of the field represents the type of data that can be stored in that field.

### Generating and Using Prisma Client

Once you have defined your entities, you can generate Prisma Client, which is a type-safe database client that enables you to interact with your database. To generate Prisma Client, you need to run the following command:

```bash
npx yarn prisma:generate
```

After generating Prisma Client, you can import it into your code to interact with your database. For example, to create a new user, you would do something like this:

```javascript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: {
          title: 'Hello World',
        },
      },
    },
  })
  console.log(newUser)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

This would create a new user named Alice, with the email `alice@prisma.io`, and a single post with the title "Hello World".

## Working with GraphQL

At the moment, we are using [schema-first](https://www.apollographql.com/blog/backend/architecture/schema-first-vs-code-only-graphql/) approach. Firstly, we define our schema and then we implement resolvers.

_api/graphql/user.graphql_

```GraphQL
type User {
  id: ID!
}

type Query {
  user(id: ID!): User!
}
```

_api/resolvers/userResolver.ts_

```Typescript
import { Resolvers } from 'api/generated/resolversTypes'

export const UserResolver: Resolvers = {
  Query: {
    user: async (_, { id }) => {
      return prisma.user.findUnique({ where: { id } })
    },
  },
}
```

_components/UserDetail.tsx_

```TSX
import { useUserQuery } from 'apollo/generated/graphqlClient'
type UserDetailProps = { id: string }
function UserDetail({ id }: UserDetailProps) {
  const { data } = useUserQuery({ variables: { id } })
  return <div>{data?.user?.id}</div>
}
```

### Type-safety

You may have noticed that we are importing some files from generated folders both in the server and the client. We are using [graphql-codegen](https://the-guild.dev/graphql/codegen) to generate types for our GraphQL schema. This way, our resolvers are type-safe and we can use generated hooks in our components.

Generators are run in watch mode when running `yarn dev`. Any change that you do to the schema will be reflected in the generated files automatically. Generated files are not pushed to the repository but rather generated on the fly (locally and in CI). This prevents unnecessary merge conflicts.

### Mocking resolvers

Resolvers can be mocked via [MSW](https://mswjs.io/). This is useful for mocking data in Storybook. You can find more info in the [Storybook Integration](#storybook-integration) section.

### GraphQL Playground

Yoga server automatically exposes GraphiQL that can be found at `http://localhost:3000/api/graphql`. It is a web interface where you can test your queries and mutations.

## Internationalization with i18next and next-i18next

This project uses [i18next](https://www.i18next.com/), an internationalization-framework written in and for JavaScript, along with [next-i18next](https://github.com/i18next/next-i18next) which provides a way to use i18next in Next.js projects. These tools enable easy translation and localization of the application into different languages.
More info can be found in [i18n readme doc](docs/i18n.md).

### Defining and Registering a New Translation Namespace

To define a new translation namespace, you need to add it to the `i18next.d.ts` file. Here's an example of how you can define a new namespace:

```typescript
import type common from '../public/locales/en/common.json'

interface I18nNamespaces {
  common: typeof common
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: I18nNamespaces
  }
}
```

Once you've defined a new namespace, you can add translation files for each language under the `public/locales/{language}/` directory.

### Using Translation in Your Code

To use translated text in your code, you use the `useTranslation` hook provided by `next-i18next`. Here's an example:

```jsx
import { useTranslation } from 'next-i18next'

export const MyComponent = () => {
  const { t } = useTranslation('common')

  return <p>{t('keyFromMyNamespace')}</p>
}
```

In this example, `useTranslation('myNamespace')` tells i18next to use the `myNamespace` translation namespace. Then `t('keyFromMyNamespace')` is used to get the translated text for the key `'keyFromMyNamespace'`.

## Storybook Integration

[Storybook](https://storybook.js.org/) is an open-source tool for developing UI components in isolation. It's a great way to document, test, and explore your components as you develop them. This project template integrates Storybook, allowing you to visualize and interact with your components in a sandboxed environment.

### Registering a New Translation Namespace in Storybook

If you add a new translation namespace, you need to register it in the `i18next.ts` file within the `.storybook/` directory. You do this by adding it to the `ns` definition. Here's an example:

```typescript
const ns = ['admin', 'common', 'error', 'member', 'planet', 'myNewNamespace']
```

### Registering a New Language in Storybook

To register a new language in Storybook, you need to add it to the `locales` object in the `preview.js` file within the `.storybook/` directory. Here's an example:

```typescript
locales: {
  en: 'English',
  sk: 'Slovak',
  es: 'Spanish'
},
```

### Providers Decorator

The `ProvidersDecorator.tsx` file within the `.storybook/` directory is used to wrap your stories with any providers that your components might rely on. For this project, the decorator wraps your stories with an `ApolloProvider` and an `I18nextProvider`, setting up both GraphQL and i18n contexts for your components.

### Mocking with Mock Service Worker (MSW)

In order to develop and test components in isolation, it's often helpful to mock any data dependencies they have. For this project, we're using the [Mock Service Worker](https://mswjs.io/) library (MSW) to mock GraphQL endpoints in our Storybook stories.

MSW is an API mocking library that uses service workers to intercept network requests. It allows you to define request handlers for various types of requests (like GraphQL queries or mutations), and respond with mocked data. This way, you can simulate different API states directly in the browser, without having to manipulate your backend.

Here's an example of how you can define a mock in a Storybook story:

```tsx
import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { HelloQuery, HelloQueryVariables } from 'apollo/generated/graphqlClient'
import { graphql } from 'msw'
import Hello from './Hello'

export default {
  title: 'Hello',
  component: Hello,
} as Meta

const Template: StoryFn<typeof Hello> = (args) => <Hello {...args} />

export const Default = Template.bind({})

Default.parameters = {
  msw: {
    handlers: {
      hello: graphql.query<HelloQuery, HelloQueryVariables>('Hello', (req, res, ctx) => {
        const { name } = req.variables
        return res(
          ctx.data({
            hello: `Hello ${name}`,
          }),
        )
      }),
    },
  },
}

Default.args = {
  name: 'World',
}
```

In this example, we're defining a mock for the 'Hello' GraphQL query in the `Default.parameters.msw.handlers` object. When the 'Hello' query is made with `{ name: 'World' }` as variables, the mock responses with `{ hello: 'Hello World' }`.

By using MSW, you can ensure that your components behave correctly for any API state, all without a running backend. This allows you to develop and test your components faster and with more confidence.

## Environment Variables

This project uses several environment variables for configuration. These variables are stored in a `.env.local` file at the root of the project. Here are the variables used in this template:

```bash
# DATABASE
DATABASE_HOST=localhost          # The host of your database
DATABASE_NAME=DATABASE_NAME      # The name of your database
DATABASE_PORT=5432               # The port your database is running on
DATABASE_USER=postgres           # The username to connect to your database
DATABASE_PASSWORD=postgres       # The password to connect to your database
DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}" # The full URL to connect to your database

# Local SMTP server (smtp4dev)
SMTP_USER=                       # The username for your SMTP server
SMTP_PASSWORD=                   # The password for your SMTP server
SMTP_HOST=localhost              # The host of your SMTP server
SMTP_PORT=25                     # The port your SMTP server is running on
EMAIL_FROM=test@email.com        # The email address to send emails from

#Auth0
AUTH0_CLIENT_ID=                 # Your Auth0 client ID
AUTH0_CLIENT_SECRET=             # Your Auth0 client secret
AUTH0_ISSUER=                    # The issuer of your Auth0 tokens (should be the fully qualified URL – e.g. https://dev-s6clz2lv.eu.auth0.com)

# NextAuth
NEXTAUTH_URL=http://localhost:3000  # The base URL your NextAuth server is running on
NEXTAUTH_SECRET=qdCKI6hineeV0s730bMllZ4jRVBjI/zhV2S++jxGVcs= # The secret used by NextAuth for encrypting cookies and generating signing keys

# Storybook
GRAPHQL_API_HOST=http://localhost:3000  # The base URL your GraphQL server is running on (used by Storybook)

#Sentry
SENTRY_DSN=                      # The DSN of your Sentry project

# General
NODE_ENV=development             # The current Node.js environment
LOG_LEVEL=trace                  # The minimum level of logs to show
```

Remember to replace the placeholders with your actual values. Also, never commit your `.env.local` file to the repository, as it may contain sensitive information. Instead, include a `.env.local.example` file with placeholder values to guide other developers.

### Validating Environment Variables

This project uses a schema to validate environment variables. This schema is defined in the `src/api/utils/apiEnv.ts` file. By doing this, we ensure that the environment variables are in the expected format and contain the expected values. Here is an example of how this works:

```typescript
import { z } from 'zod'

const EnvSchema = z.object({
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
  SENTRY_DSN: z.string().optional(),
  NEXTAUTH_URL: z.string(),
})

export type ApiEnvType = z.infer<typeof EnvSchema>
export const ApiEnv = EnvSchema.parse(process.env)
```

In the example above, we define a schema for our environment variables using Zod. We then parse the `process.env` object using this schema, which will validate the environment variables according to the rules defined in the schema.

To use environment variables in your project, you should import the `env` object from `src/api/utils/apiEnv.ts` and use it instead of `process.env`. This ensures that you're always using validated environment variables.

Here's an example:

```typescript
import { ApiEnv } from './apiEnv'

console.log(ApiEnv.NEXTAUTH_URL) // Prints the value of NEXTAUTH_URL, which has been validated by our schema
```

By following this practice, we can catch any potential issues with environment variables early and provide clearer error messages when the environment is misconfigured.

## CI / CD

When a PR is opened/updated:

- Storybook gets deployed to GitHub Pages via [GH action](./.github/workflows/storybook-preview.yml)
- [verify GH action](./.github/workflows/verify.yml) runs type check, lint & tests

When the PR is closed:

- the storybook preview is deleted

## Automatic dependency updates

For automatic dependency updates, we use Renovate.

It is an open-source tool which automatically creates pull requests for all types of dependency updates. Includes crowdsourced test and package adoption data are used to flag potentially risky updates and enable auto-merging for those that meet user-defined conditions.

How Renovate works:

- Scans your repos to detect dependencies (wide package manager support)
- Checks if any newer versions exist
- Raises PRs for available updates

> You can find base renovate configuration in `./renovate.json`

**Links**

- [Installation guide](https://docs.renovatebot.com/getting-started/installing-onboarding/#hosted-githubcom-app)
- [Enabling vulnerability alerts](https://docs.renovatebot.com/configuration-options/#vulnerabilityalerts)
- [What is a dependency dashboard](https://docs.renovatebot.com/key-concepts/dashboard/)
- [Schedulling updates](https://docs.renovatebot.com/key-concepts/scheduling/)

## Monitoring

Monitoring is an essential practice in application development and maintenance. It involves the collection, processing, analysis, and visualization of data about the application's behavior and performance. Monitoring helps developers identify issues early, understand the state and health of the application, and make informed decisions to enhance its performance and user experience.

In this template, we use the Pino logging library for monitoring. Pino is a very fast Node.js logger, inspired by Bunyan but with a significantly reduced footprint. It offers a simple API for logging messages at different levels (such as 'info', 'warn', 'error'), and it outputs logs in a format that is easy to consume, either by humans or log processing systems.

Here's how Pino is configured in the `src/api/services/logService.ts` file:

```typescript
import pino, { Logger } from 'pino'
import { createWriteStream } from 'pino-sentry'
import { ApiEnv } from '../utils/apiEnv'

const streams = pino.multistream([
  { stream: createWriteStream({ dsn: ApiEnv.SENTRY_DSN }) },
  { stream: process.stdout, level: ApiEnv.LOG_LEVEL },
])
export const logger: Logger = pino(
  {
    level: ApiEnv.LOG_LEVEL,
  },
  streams,
)
```

In this configuration, we create a logger that writes to multiple streams. One of these streams is a Sentry write stream, which sends logs to Sentry if a DSN is provided. The other is the standard output (`process.stdout`), which is where logs will be printed when running the application locally. The log level is controlled by the `LOG_LEVEL` environment variable.

Instead of using `console.log`, you should use the `logger` object for logging in your application. This ensures that all logs are properly formatted and sent to the right places.

### Sentry

Sentry is an open-source application monitoring platform that helps you identify issues in real-time. With Sentry, you can track errors, performance issues, and crashes, get alerted to issues before users do, and gain insights into how issues affect user experience.

In this template, Sentry is used to capture and log errors in the GraphQL server. We use the Yoga GraphQL server, which is a fully-featured, production ready server-side library that wraps around the "core" of GraphQL.js, Express, and a few other libraries to provide a flexible, feature-rich framework.

Sentry is integrated into the GraphQL server through the `@envelop/sentry` plugin, which is included in the Yoga server setup:

```typescript
import { useSentry } from '@envelop/sentry'
import { PrismaClient } from 'api/prismaClient'
import { schema } from 'api/schema'
import { YogaServerContext } from 'api/types/GraphQLContext'
import { createYoga, maskError } from 'graphql-yoga'
import '@sentry/tracing'

export default createYoga<YogaServerContext>({
  schema,
  plugins: [useSentry({})],
  // ...
  maskedErrors: {
    maskError(error, message, isDev) {
      return maskError(isDev ? error : undefined, message, isDev)
    },
  },
})
```

One important aspect of error handling in GraphQL servers is error masking. This is the practice of replacing the original error message with a generic one before sending it to the client. This helps to avoid exposing sensitive information or internal implementation details. In the configuration above, we use a custom `maskError` function to implement error masking.

### Configuring Sentry

To properly use Sentry for monitoring your application, you need to configure it with your Sentry project details. This involves setting up a Sentry project and filling in the relevant details in the `sentry.properties` file located at the root directory of the project.

The `sentry.properties` file might look like this:

```properties
defaults.url=https://sentry.io/
defaults.org=
defaults.project=
cli.executable=node_modules/@sentry/cli/bin/sentry-cli
```

To complete the configuration, follow these steps:

1. **Set up a Sentry project:** If you haven't already, go to Sentry's website, sign up or log in, and create a new project. The type of project should correspond to the language or framework you are using, in this case, NextJS (Node.js).

2. **Fill in the `sentry.properties` file:** Once you've created your Sentry project, you'll be able to find the details required for the `sentry.properties` file.

   - `defaults.org`: This should be set to your Sentry organization's slug (a URL-friendly version of the name). You can find this in the settings of your Sentry account.

   - `defaults.project`: This should be set to your Sentry project's slug, which can be found in the settings of the project you just created.

   - The `defaults.url` and `cli.executable` fields usually don't need to be changed unless you are using a self-hosted version of Sentry or a different Sentry CLI.

3. **Configure CI/CD:** After setting up Sentry and filling out the `sentry.properties` file, you can proceed to set up your CI/CD pipeline. Remember to include steps in your pipeline to build, test, and deploy your application, as well as to report errors to Sentry.

With these steps, you should be able to monitor your application using Sentry, and keep track of any errors or issues that arise during development or after deployment.

# Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Cron job recipe](docs/cron.md) - an introduction to Cron Jobs. You can read how to define Cron Jobs in different ways like in the NodeJS process, with BullMQ or on Cloud.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
