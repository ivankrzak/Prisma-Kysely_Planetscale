## Description

This pull request adds support for user subscriptions and one-off payments. Subscriptions can be cancelled anytime and one-off payments refunded.

We have integrated a low-code solution called Stripe Checkout. There's a webhook that listens to the Stripe events and changes the database state accordingly.

## Changes

- Added the Stripe customer ID to the user entity
  - This allows us to create a new checkout session for existing users so that Stripe can track their transaction history and save payment details for future checkout sessions.
  - We create the Stripe customer for users the first time they initialize checkout sessions.
- Created a subscription entity to maintain the subscription state.
- Created an invoice and invoice_items entities to track transaction history internally
  - Needed for verification whether user has paid a trip fee and revenue growth metrics
- Implemented a webhook to process Stripe events.
  - Storing processed events in the database to achieve idempotency.
  - Verifying the signature header to ensure that the event was sent by Stripe.

## PR Checklist

- [x] I have self-reviewed the code before publishing a PR
- [x] I have followed code quality and best practice standards
- [x] Changes have been tested locally and do not introduce new issues
- [x] Added new environment variables to the .env.example file

## TODO

- [ ] Create Stripe production tier
  - [ ] Populate env variables before the PR is merged
