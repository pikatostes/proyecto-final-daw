# docker/php/Dockerfile
FROM php:8.2-fpm

# Instalar extensiones necesarias para Symfony
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install intl pdo pdo_pgsql pdo_mysql opcache zip

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copiar los archivos del proyecto al contenedor
COPY . .

# Instalar las dependencias de Symfony
RUN composer install

# Dar permisos a la carpeta var/cache y var/log
RUN chown -R www-data:www-data var/cache var/log

