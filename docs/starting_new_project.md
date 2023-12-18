## Creating a new repository

The nextjs-template is a template. It gives you an option to generate a new repository with the same structure and files. To do so, use the 'Use this template' button that can be found in the [repository root](https://github.com/sudolabs-io/nextjs-template).

## Deployments

### Render

If you choose render, create an infrastructure from the `render.yaml` [blueprint](https://render.com/docs/infrastructure-as-code) that can be found in the root folder.

### Aws

If you choose AWS, check out [this PR](https://github.com/sudolabs-io/nextjs-template/pull/60)

## Linear

- setup issue & PR linking ([docs](https://linear.app/docs/github#link-prs))
- setup status automation ([docs](https://linear.app/docs/github#pr-automation))

## Git

- add team members to the CODEOWNERS file ([example](https://tech.people-doc.com/using-github-codeowners-file.html))
- create `gh-pages` branch (needed for Storybook PR previews)
- enable only squash merge option ([docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/configuring-commit-squashing-for-pull-requests))
- add branch protection rule ![](assets/branch_protection_rules.png)

## Everhour

Every Everhour project should have at least following tasks:

- Development - New Tasks: when working on a new feature
- Code review: when reviewing a team member's pull request
- Pair programming: when joining a team member to collaborate on a feature
- Project meetings: when attending refinements, retrospectives or demos

## Async standups

To set up a standup bot using the Standup and Prosper Slack app, enter `/standup create` in the project's development channel. This will configure an asynchronous standup.

## Google group

With a [Google Group](https://groups.google.com/my-groups), you can easily send an email to everyone using just one address, invite the group to an event, or share documents. For example, you can set up email alerts for the group, so whenever a new member joins the team and is added to the group, you can be sure that they receive all the necessary information.
