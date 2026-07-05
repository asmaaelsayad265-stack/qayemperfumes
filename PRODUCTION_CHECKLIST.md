# QAYEM Perfumes Production Checklist

## Infrastructure

### Environment variables
- Set `APP_ENV=production`, `APP_DEBUG=false`, and a generated `APP_KEY`.
- Set `APP_URL` to the production API origin.
- Set `FRONTEND_URL` to the production website origin.
- Set `NEXT_PUBLIC_API_URL` to the production `/api/v1` base URL.
- Configure `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD`.
- Configure `SANCTUM_STATEFUL_DOMAINS` with the production frontend domain.
- Configure `SESSION_DOMAIN` for the production cookie domain.
- Configure `CACHE_STORE`, `QUEUE_CONNECTION`, `LOG_CHANNEL`, and mail/provider credentials.
- Store secrets only in the deployment platform secret manager, not in source control.

### Database setup
- Use a managed MySQL-compatible database for production.
- Create a dedicated least-privilege database user for the application.
- Enable automated daily backups and point-in-time recovery where available.
- Run migrations through the release process with `php artisan migrate --force`.
- Verify indexes for product slug, category slug, inventory SKU, and common listing filters.
- Restrict database network access to application hosts only.

### Storage setup
- Use durable object storage for uploaded product/category images in production.
- Configure `FILESYSTEM_DISK` and cloud credentials for the selected storage provider.
- Ensure uploaded images are not stored only on ephemeral app servers.
- Define maximum upload size and accepted MIME types at web server and application layers.
- Configure CDN caching for public product imagery.

### Sanctum configuration
- Set `SANCTUM_STATEFUL_DOMAINS` to production frontend domains only.
- Set `SESSION_DOMAIN` to the correct parent domain when cookie auth is used.
- Enforce HTTPS cookies in production.
- Confirm admin API mutations require `auth:sanctum`.
- Rotate compromised tokens immediately.

### CORS configuration
- Set `FRONTEND_URL` to the exact production frontend origin.
- Do not use wildcard origins for authenticated admin APIs.
- Allow only required methods and headers at the edge and application layers.
- Verify preflight requests for `Authorization`, `Content-Type`, and `Accept`.

### SSL requirements
- Force HTTPS for frontend and backend.
- Enable HSTS after confirming all subdomains support HTTPS.
- Use modern TLS settings through the load balancer or reverse proxy.
- Renew certificates automatically and alert before expiration.

### Backup strategy
- Run automated database backups at least daily.
- Keep multiple restore points across separate retention windows.
- Back up object storage metadata and critical uploaded media.
- Test restore procedures before launch and after schema changes.
- Document RPO and RTO targets for the business.

## Frontend

### Build commands
- Install dependencies with `npm ci`.
- Validate quality with `npm run lint`.
- Validate types with `npx tsc --noEmit`.
- Build production assets with `npm run build`.
- Start production runtime with `npm run start` or the hosting platform equivalent.

### SEO checklist
- Define production metadata for title, description, canonical URLs, and Open Graph.
- Add sitemap and robots configuration.
- Confirm product pages have meaningful Arabic metadata.
- Use stable product/category slugs.
- Verify 404 and error pages are branded and index-safe.

### Image optimization
- Use optimized image delivery for product and category media.
- Configure allowed remote image domains in Next.js when using external storage/CDN.
- Provide dimensions or stable aspect ratios to avoid layout shift.
- Compress uploaded images before public delivery.
- Serve modern formats where supported.

### Performance targets
- Keep Core Web Vitals in the passing range.
- Target LCP under 2.5 seconds on key landing and product pages.
- Target CLS under 0.1.
- Keep admin CRUD interactions responsive during loading and mutation states.
- Monitor bundle size after adding admin integrations.

### Accessibility requirements
- Preserve Arabic RTL layout and readable focus states.
- Ensure all form controls have labels.
- Keep color contrast sufficient on black/gold surfaces.
- Provide keyboard-accessible modals, buttons, and forms.
- Test admin CRUD flows without a mouse.

## Backend

### Queue workers
- Use a production queue driver for deferred work.
- Run supervised queue workers with restart policies.
- Configure retries, timeouts, and failed job retention.
- Monitor failed jobs and alert on repeated failures.

### Cache configuration
- Use a production cache store such as Redis.
- Run `php artisan config:cache`, `route:cache`, and `view:cache` during deployment.
- Clear/rebuild caches as part of rollback and release procedures.
- Avoid caching user-specific admin responses unless explicitly safe.

### Rate limiting
- Keep login throttling enabled.
- Apply rate limits to search and public write endpoints.
- Add stricter limits to admin mutation endpoints if abuse is detected.
- Log repeated throttling events for security review.

### Logging
- Use structured application logs.
- Send production logs to centralized storage.
- Do not log secrets, tokens, or payment data.
- Keep enough request context to debug failed CRUD operations.

### Error monitoring
- Connect frontend and backend to an error monitoring provider.
- Capture unhandled exceptions and failed API mutations.
- Alert on elevated 500 rates.
- Track release versions in error reports.

## Deployment

### Production environment variables
- Confirm all required backend and frontend variables are present before deploy.
- Confirm no production process depends on `.env.local`.
- Verify `APP_DEBUG=false` and production API URLs are configured.
- Verify mail, storage, cache, queue, and database credentials.

### Nginx configuration
- Point the backend document root to `backend/public`.
- Deny access to `.env`, source files, storage internals, and vendor internals.
- Route all Laravel requests through `public/index.php`.
- Configure upload size limits for approved image sizes.
- Add gzip or Brotli compression where appropriate.

### Storage symlink
- Run `php artisan storage:link` when using local public storage.
- Prefer object storage for production product images.
- Verify public media URLs resolve through the CDN or configured disk.

### Migration process
- Put the application in maintenance mode only when required.
- Back up the database before destructive migrations.
- Run `php artisan migrate --force`.
- Run post-deploy smoke tests for product, category, and inventory APIs.
- Confirm admin CRUD works after deployment.

### Rollback procedure
- Keep the previous deploy artifact available.
- Document code rollback and database rollback separately.
- Do not roll back database migrations blindly after data-changing releases.
- Restore from backup only after business approval.
- Verify health checks and admin login after rollback.

## Testing

### Unit tests
- Cover product/category/inventory services and validation rules.
- Test slug and SKU uniqueness rules.
- Test price and quantity validation boundaries.
- Test resource serialization for admin screens.

### API tests
- Test product CRUD endpoints.
- Test category CRUD and active/inactive state.
- Test inventory CRUD, SKU uniqueness, and low-stock responses.
- Test `401`, `403`, `404`, `422`, `429`, and `500` handling paths.
- Test Sanctum-protected mutation routes.

### E2E tests
- Cover admin product create/edit/delete.
- Cover category create/edit/delete and activation toggle.
- Cover inventory SKU create/edit/delete and low-stock filtering.
- Cover product detail page loading and retry states.
- Run tests against a production-like environment before release.

### Manual QA checklist
- Verify Arabic RTL layout across desktop and mobile.
- Verify black/gold visual theme remains consistent.
- Verify loading skeletons appear during slow API responses.
- Verify Arabic success and error messages for admin mutations.
- Verify image preview rejects invalid and oversized files.
- Verify no localhost URLs appear outside local environment files.
- Verify backups, logs, queues, cache, and monitoring are active before launch.
