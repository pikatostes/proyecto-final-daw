@echo off
echo Starting deployment script...

REM Navegar al directorio test-api
echo Changing directory to test-api
cd test-api

REM Instalar dependencias de Composer y ejecutar el servidor
echo Installing Composer dependencies in test-api
composer update

REM Instalar dependencias de npm (si es necesario) y ejecutar el servidor
echo Installing npm dependencies in test-api
npm install

echo Starting the server in test-api
npm start

REM Volver al directorio principal
cd ..

REM Navegar al directorio ux
echo Changing directory to ux
cd ux

REM Instalar dependencias y ejecutar el servidor
echo Installing npm dependencies in ux
npm install

echo Starting the development server in ux
npm run dev

REM Volver al directorio principal
cd ..

echo Deployment script completed.
pause
