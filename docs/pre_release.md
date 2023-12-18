## Security

- Generate a strong SSL certificate for the application's domain & enable SSL/TLS
- Check for any known vulnerabilities and ensure that all security patches are applied.
  - Allow CORS only for your domain.
  - Secure file upload and download by using signed URLs.
  - Implement role-based access control (RBAC) to restrict access to sensitive resources based on a user's job function or role.
  - Use email validation in user registration to prevent spoofing and phishing attacks.
  - Do not expose the database to the internet. If necessary, whitelist IPs that can access it.
  - For any webhook implemented for 3rd party service integration, verify that incoming messages were sent by the 3rd party service.
  - Make sure that any public endpoints don't expose sensitive data. E.g. when you need to return user entity, omit fields like address or job.
  - Consider implementing a rate limitter especially for public endpoints. And recaptcha for public frontend inputs.

## Monitoring

Monitoring helps us lower reaction time whenever something wrong happens. Alerts should notify us that our servers are unreachable and not end users.

It also provides us with information how our application behaved, when error occurred, so we understand the context and can fix it faster.

- Set up uptime monitoring for the application to ensure that it is always available to users (e.g. https://betterstack.com/better-uptime)
- Implement logging to capture and analyze application events, errors, and exceptions.
  - make sure log sink (e.g. Datadog) & Sentry is set up (SENTRY_DSN environment variable is set)
- Set up alerts for critical issues such as application downtime, server errors, or security breaches.
  - e.g. Render provides [slack alerts](https://render.com/docs/slack-notifications) whenever deployment or service failed

## Configuration

- Ensure that the application is configured correctly for the production environment.
- Set up backups for all application data to prevent data loss in case of a disaster.

## Testing

- Test the application thoroughly before releasing it to the public.
- Test the application's compatibility with different browsers, devices, and screen sizes.
- Ensure that all links, forms, and other interactive elements are working correctly.
