#!/bin/bash

# 2. Instalar el depurador
composer require debug

# 5. Añadir templates en caso de no tenerlos
composer require templates

# 7. Añadir comandos de base de datos
composer require symfony/orm-pack

# 9. Instalar comandos de creación de entidades
composer require maker-bundle

# 19. Instalar formularios
composer require symfony/form

# 21. Instalar Twig
composer require symfony/twig-bundle

# 22. Inicios de sesion
composer require symfony/security-bundle