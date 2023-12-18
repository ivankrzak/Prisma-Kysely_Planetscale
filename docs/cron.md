# Cron Job Recipe

**Table of Contents**

- [Introduction](#introduction)
- [Setting up Cron Jobs on a Standalone NextJS Server](#setting-up-cron-jobs-on-a-standalone-nextjs-server)
- [Setting up Cron Jobs on Vercel Deployment](#setting-up-cron-jobs-on-vercel-deployment)
- [Setting up Job Processing with BullMQ](#setting-up-job-processing-with-bullmq)
- [Render Platform](#render-platform)
- [Serverless Cron Jobs on AWS](#serverless-cron-jobs-on-aws)
- [Conclusion](#conclusion)

## Introduction

The name "Cron" comes from the Greek word for time, "Chronos".

The purpose of a Cron job is to automate repetitive tasks. This could be anything from sending out daily reports, cleaning up temporary files, data backups, synchronizing datasets, and much more. Any task that needs to be run on a schedule can be set up as a Cron job.

A Cron job is defined by a string, often called a "Cron expression" or "Cron string". This string represents a schedule and has the following structure:

```
*     *     *   *    *
│     │     │   │    │
│     │     │   │    └───── day of week (0 - 7) (Sunday=0 or 7)
│     │     │   └────────── month (1 - 12)
│     │     └────────────── day of month (1 - 31)
│     └──────────────────── hour (0 - 23)
└────────────────────────── minute (0 - 59)
```

Each field can contain a single number, a range of numbers (like `1-5`), a list of numbers (like `1,2,3`), or an asterisk (which means "all values").

For example, a Cron string of `0 5 * * 1` means "at 5:00 AM every Monday", and `30 0 1 * *` means "at 12:30 AM on the first day of every month".

By combining these fields in various ways, you can create a flexible schedule for your tasks.

### Warning: Auto-Scaling Servers and Cron Jobs

Before we dive into the setup instructions, it's important to address a crucial detail concerning the deployment of Cron jobs on auto-scaling servers. When your standalone server is set up for auto-scaling, multiple instances of your application could potentially be running at the same time. This means that your Cron jobs could also be triggered simultaneously across these instances, which may not be desirable for certain tasks.

To avoid this issue, we recommend running your Cron jobs on a separate server that doesn't use auto-scaling. This way, you can ensure that your Cron jobs run sequentially and at the desired times without the risk of parallel execution.

## Setting up Cron Jobs on a Standalone NextJS Server

To set up Cron jobs in a standalone NextJS server, we recommend using the Node.js package [node-cron](https://github.com/node-cron/node-cron). It is a simple, feature-rich, and flexible Cron job scheduler that aligns with the standard Cron syntax.

1. Install `node-cron` in your project:

```bash
npm install --save node-cron
```

2. Use the package in your application:

```javascript
const cron = require('node-cron')

// Schedule tasks to be run on the server.
cron.schedule('* * * * *', function () {
  console.log('Task is running every minute')
})
```

Here, replace `' * * * * * '` with your desired cron schedule and `console.log('Task is running every minute');` with the function you want to schedule.

## Setting up Cron Jobs on Vercel Deployment

Vercel supports [Cron jobs](https://vercel.com/blog/cron-jobs) for Serverless and Edge Functions. Follow these steps to create a Cron job on Vercel:

1. **Create a new file in the `/api` directory of your project.** This file will contain your Cron job handler. Each JavaScript or TypeScript file within this directory becomes an API route that's handled by a serverless function.

   Example: If you create a file at `/api/dailyUpdate.js`, your serverless function would be accessible at the URL `http(s)://<your-domain>/api/dailyUpdate`.

2. **Write your Cron job handler.** The function should export a default function that performs the desired task. Here's a simple example of a function that could be run as a Cron job:

   ```javascript
   export default async () => {
     // Your task here
     console.log('Running daily update')
   }
   ```

   This function could be run as a Cron job. It doesn't handle an HTTP request or response like a typical serverless function, but instead just performs a task.

3. **Avoid turning utility files into serverless functions.** If you need to place extra code files, such as `utils.js` or `my-types.d.ts`, inside the `/api` folder, prefix these files with an underscore `_`, a dot `.`, or end with `.d.ts` to prevent them from being turned into serverless functions.

4. **Local development.** When building Next.js applications on Vercel, you can use the native `next dev` command and local development server to iterate on your API Routes.

5. **Deploy your function.**

6. **Configure the Cron job in Vercel.** In your `vercel.json` file, add a "crons" section and specify the path to your function and the Cron schedule. Here's an example that runs the `dailyUpdate` function every day at 5:00 am UTC:

   ```json
   {
     "crons": [
       {
         "path": "/api/dailyUpdate",
         "schedule": "0 5 * * *"
       }
     ]
   }
   ```

### Note that Cron jobs are invoked only for production deployments. Preview deployments are ignored.

## Render Platform

[Cron jobs](https://render.com/docs/cronjobs) can be created on Render using any of your GitHub or GitLab repositories. Just like with web services, you can choose the appropriate runtime environment and branch in the repo that contains your cron job code. When you push changes to your repo, Render automatically builds a new version of your code for the next scheduled run of your cron job. Each execution of your job runs in a new instance of your cod.

### Creating a Cron Job

#### Cron Schedule

The schedule for the command or script you’d like to run periodically can be specified using a cron expression.

#### Cron Command

Render cron job instances are Linux environments, so the cron command should be one of the following:

1. Any valid Linux command, for example, `echo 'hello'`.
2. An executable bash script containing the command(s) you’d like to run periodically.

#### Environment Variables

Just like any other service on Render, cron jobs can use environment variables for things like database URLs and API keys. You can also use Environment Groups if you need your cron jobs to share environment variables with other cron jobs or services.

### Running Cron Jobs Manually

If you need to run a cron job off-schedule, perhaps for debugging, you can always trigger a cron job run manually. However, keep in mind that this will cancel a currently running job.

### Concurrency & Timeouts

Render guarantees that at most one run is active at any given time for every cron job. If you manually trigger a run during another active run for the same cron job, Render will cancel the active run and start a new one. If a job hasn’t finished by the time of the next scheduled run, the next run is delayed until the previous run is finished. A cron job run will be stopped if it does not complete within 12 hours of starting. For jobs that need to run continuously, use background workers.

Sure, here's a basic outline of the steps you'd need to take to deploy a CRON job on AWS using Terraform and TypeScript. This guide assumes that you are familiar with AWS, Terraform, and TypeScript, and have the necessary software and permissions to work with these tools.

## Serverless Cron Jobs on AWS

Pre-requisites:

- AWS CLI configured with your account
- Node.js and TypeScript installed on your local machine
- Terraform installed on your local machine

### Step 1: Create your TypeScript AWS Lambda function

Create a new directory for your TypeScript project and navigate into it:

```
mkdir my-cron-job && cd my-cron-job
```

Initialize a new Node.js project:

```
npm init -y
npm install -D typescript @types/node ts-node
```

Create a `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Create a new TypeScript file in the `src` directory, for example, `src/index.ts`. This file will contain your Lambda function code.

```typescript
exports.handler = async function (event: any, context: any) {
  console.log('EVENT: \n' + JSON.stringify(event, null, 2))
  // your cron job here
}
```

Compile your TypeScript code into JavaScript:

```
npx tsc
```

Create a zip file of the compiled JavaScript and `node_modules`:

```
zip -r function.zip ./dist ./node_modules
```

### Step 2: Write Terraform configuration

1. Install Terraform and make sure it's in your PATH.

2. Create a new file `main.tf` and add the following Terraform configuration. This sets up your AWS provider, creates your Lambda function, and sets up a CloudWatch event rule to trigger your function on a schedule.

```terraform
variable "aws_region" {
  default = "us-west-1"
}

variable "aws_profile" {
  default = "default"
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}

resource "aws_lambda_function" "my_lambda" {
  function_name = "my_lambda"

  // Replace this with your own file path and name
  filename = "/path/to/your/lambda.zip"

  handler = "index.handler"
  runtime = "nodejs18.x"

  role = aws_iam_role.lambda_exec_role.arn
}

resource "aws_cloudwatch_event_rule" "every_five_minutes" {
  name                = "every-five-minutes"
  schedule_expression = "cron(0/5 * * * ? *)"
}

resource "aws_cloudwatch_event_target" "five_minutes_lambda" {
  rule      = aws_cloudwatch_event_rule.every_five_minutes.name
  target_id = "lambda"
  arn       = aws_lambda_function.my_lambda.arn
}

resource "aws_lambda_permission" "allow_cloudwatch_to_call_my_lambda" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.my_lambda.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.every_five_minutes.arn
}
```

### Step 3: Deploy your infrastructure

1. Initialize Terraform.

```bash
terraform init
```

2. Check your plan.

```bash
terraform plan
```

3. Apply your configuration.

```bash
terraform apply
```

Your cron job is now set up and will run your Lambda function every five minutes.

This example is a simplified version of the process and does not include error checking or best practices for writing production-level code. For a production environment, you would need to take additional steps like setting up proper IAM roles and policies, error checking and handling, logging, and more.

For further reading, check out the official AWS documentation on [Scheduled Events for Lambda Functions](https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents-expressions.html) and Terraform's documentation on the [AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs).

## Setting up Job Processing with BullMQ

[BullMQ](https://github.com/taskforcesh/bullmq) is a robust queue service for handling jobs in Node.js. It's perfect for tasks that need to be processed in the background, outside of the main application flow. Here's how to set it up:

It's built on top of Redis, a fast and resilient in-memory data structure store, which is used for message persistence. This means that BullMQ is suitable for both small and large projects, as it can handle high amounts of data efficiently and recover from server restarts without losing data.

### Remember, the worker file should be run in a separate process. In a production environment, this would typically be a different server or container from the one running your main application.

### Infrastructure Requirements for BullMQ

1. **Redis Server**: BullMQ requires a Redis server to operate. The server can be installed on your local machine for development purposes, or on a separate server or cloud service for production. It's important to ensure that the Redis server is secure, up-to-date, and properly configured for your needs.

2. **Node.js Environment**: BullMQ is a Node.js library, so you'll need a Node.js environment to run it. The environment could be a simple server or a complex, containerized setup with Docker or Kubernetes.

3. **Separate Workers**: BullMQ operates with the concept of job queues and workers. Each worker picks up jobs from the queue and processes them. It's recommended to run these workers on separate processes, servers, or containers to ensure that they can operate independently and not block the main application flow. This also provides flexibility in scaling, as you can add more workers as your load increases.

4. **Database for Job Data**: While BullMQ uses Redis for job persistence, you might need a separate database for storing job data, depending on the nature of your jobs. For example, if your jobs are processing data and storing the results, you'll need a database suitable for your data size and query needs.

### How to setup BullMQ

1. Install BullMQ in your project:

```bash
npm install bullmq --save
```

2. Use the package in your application:

```javascript
const { Queue } = require('bullmq')

// Initialize a new queue
const myQueue = new Queue('my-queue')

// Add a job to the queue
myQueue.add('my-job', {
  // Job data here
})
```

3. To process jobs, create a separate worker file:

```javascript
const { Worker } = require('bullmq')

// Initialize a worker for the 'my-queue' queue
const worker = new Worker('my-queue', async (job) => {
  // Job processing logic here
})
```

When a worker instance is created, it launches the processor [immediately](https://docs.bullmq.io/guide/workers).

You can replace `'my-job'` and `'my-queue'` with your desired job and queue names, and replace the comments with your job data and processing logic.

To run a new process with a worker in TypeScript using a command defined in the package.json file, follow these steps:

1. Create a new file (e.g., `worker.ts`) in your project's directory, and write your worker code.

2. In your `package.json` file, locate the "scripts" section. Add a new script entry that specifies the command to run your worker process. For example:

   ```json
   "scripts": {
     "start-worker": "ts-node worker.ts"
   }
   ```

   In the above example, we assume you have `ts-node` installed as a development dependency. If not, you can install it by running:

   ```
   npm install --save-dev ts-node
   ```

   Adjust the script name (`start-worker`) and the file name (`worker.ts`) according to your preferences and naming conventions.

3. Open a terminal or command prompt and navigate to your project's directory.

4. Run the following command to start the worker process using the script defined in the package.json:

   ```
   npm run start-worker
   ```

   This command will execute the specified script using `ts-node`, which compiles and runs your TypeScript code without the need for explicit compilation.

   Alternatively, if you have TypeScript installed globally, you can use the `tsc` command to compile your TypeScript code first and then run the resulting JavaScript file. To do so, modify the script entry in your `package.json` to:

   ```json
   "scripts": {
     "start-worker": "tsc && node dist/worker.js"
   }
   ```

   In the above example, we assume that the TypeScript compiler (`tsc`) outputs the compiled JavaScript files in the `dist/` directory. Adjust the path (`dist/worker.js`) according to your specific configuration.

5. After running the command, your worker process should start and execute the code defined in the `worker.ts` file.

### Repeatable Jobs aka CRON jobs

[Doc](https://docs.bullmq.io/guide/jobs/repeatable)

There is a special type of meta job called repeatable. These jobs are special in the sense that even though you only add one job to the queue, they will keep repeating according to a predefined schedule.

There are two ways to specify a repeatable's job repetition pattern, either with a cron expression or specifying a fix amount of milliseconds between repetitions.

```typescript
import { Queue, QueueScheduler } from 'bullmq'

const myQueue = new Queue('Paint')

// Repeat job once every day at 3:15 (am)
await myQueue.add(
  'submarine',
  { color: 'yellow' },
  {
    repeat: {
      pattern: '0 15 3 * * *',
    },
  },
)

// Repeat job every 10 seconds but no more than 100 times
await myQueue.add(
  'bird',
  { color: 'bird' },
  {
    repeat: {
      every: 10000,
      limit: 100,
    },
  },
)
```

There are some important considerations regarding repeatable jobs:

- Bull is smart enough not to add the same repeatable job if the repeat options are the same.
- If there are no workers running, repeatable jobs will not accumulate next time a worker is online.
- repeatable jobs can be removed using the `removeRepeatable` method or `removeRepeatableByKey`.

You still need a worker process to handle these repeatable jobs.

### How to manually run an already inserted job

[Doc](https://docs.bullmq.io/patterns/manually-fetching-jobs)

When a Worker is instantiated, the most common usage is to specify a process function so that the worker will automatically process the jobs that arrive to the queue.

Sometimes however it is useful to be able to fetch the jobs manually. Just instantiate the worker without a processor and call getNextJob to fetch the next job:

```typescript
const worker = new Worker('my-queue')

// Specify a unique token
const token = 'my-token'

const job = (await worker.getNextJob(token)) as Job

// Access job.data and do something with the job
// processJob(job.data)
if (succeeded) {
  await job.moveToCompleted('some return value', token, false)
} else {
  await job.moveToFailed(new Error('my error message'), token, false)
}

await worker.close()
```

## Conclusion

We hope this guide helps you in setting up and managing your Cron jobs and job processing tasks in your NextJS application. As always, each application has unique requirements and constraints, so adjust these instructions as needed to best serve your project's needs. If you have any questions or need further assistance, please don't hesitate to reach out to our team.
