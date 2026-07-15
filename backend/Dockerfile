FROM php:8.3-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    supervisor \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libwebp-dev \
    libxpm-dev \
    libzip-dev \
    oniguruma-dev \
    libxml2-dev \
    mysql-client \
    bash \
    curl \
    git \
    unzip

# Configure PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip xml

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# Copy application code
COPY . .

# Complete composer installation
RUN composer dump-autoload --optimize

# Generate laravel optimization
# NOTE: This is an API-only project with no Blade views (resources/views does
# not exist), so `php artisan view:cache` is intentionally skipped to avoid the
# "View path not found." build error. config:cache and route:cache are still
# applied for production performance.
RUN php artisan config:cache \
    && php artisan route:cache

# Create storage directories and set permissions
RUN mkdir -p storage/framework/{cache,sessions,views} \
    && mkdir -p storage/logs \
    && mkdir -p bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/http.d/default.conf

# Copy supervisor configuration
COPY docker/supervisord.conf /etc/supervisord.conf

# Ensure php-fpm listens on TCP 127.0.0.1:9000 so nginx fastcgi_pass matches.
# The default pool may use a Unix socket depending on the image; force TCP to
# guarantee nginx <-> php-fpm connectivity. `|| true` keeps the build safe if
# the default pool path differs between image versions.
RUN sed -i 's#^listen = .*#listen = 127.0.0.1:9000#' /usr/local/etc/php-fpm.d/www.conf 2>/dev/null || true

# Create supervisor log directory (required by supervisord.conf childlogdir and
# logfile). Without this, supervisord aborts at startup with
# "/var/log/supervisor is not an existing directory" and nginx/php-fpm never
# start, failing the /up healthcheck.
RUN mkdir -p /var/log/supervisor \
    && chown root:root /var/log/supervisor \
    && chmod 755 /var/log/supervisor

# Expose port
EXPOSE 80

# Start supervisord
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]