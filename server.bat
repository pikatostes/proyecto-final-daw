@echo off
echo Starting deployment script...

REM Navegar al directorio test-api
echo Changing directory to test-api
cd test-api

REM Instalar dependencias y ejecutar el servidor
echo Installing dependencies in test-api
@REM composer update

echo Starting the server in test-api
start /b symfony server:start --port=8000 --allow-http --no-tls

REM Volver al directorio principal
cd ..

REM Navegar al directorio ux
echo Changing directory to ux
cd ux

REM Instalar dependencias y ejecutar el servidor
echo Installing dependencies in ux
npm install

echo Starting the development server in ux
start /b npm run dev

REM Volver al directorio principal
cd ..

echo Deployment script completed.
pause
