# Investigations into monitoring serverless and edge functions on Vercel with Sentry

## Hypothesis:

Adding error monitoring solutions to serverless/edge functions has the potential
to increase code execution time when cold-starting/not cached, which _could_
lead to timeouts depending on the complexity of the logic platform-specific
function execution limits.

---

Each serverless or edge function makes an arbitrary call to the Pokemon API,
sorts the data, and returns the execution time of the function.

I collected data _in production_ for the functions with and without using
Sentry.

## Vercel Serverless Functions

- [Without Sentry](https://serverless-monitoring.vercel.app/api/default)
- [With Sentry](https://serverless-monitoring.vercel.app/api/with-sentry)

## Vercel Edge Functions

- [Edge Function without Sentry](https://serverless-monitoring.vercel.app/api/edge-default)
- [Edge Function with Sentry](https://serverless-monitoring.vercel.app/api/edge-with-sentry)
