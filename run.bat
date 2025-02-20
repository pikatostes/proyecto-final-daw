@echo off

rem Función para ejecutar symfony serve en la carpeta api
:run_symfony_serve
echo Ejecutando symfony serve en la carpeta api...
cd test-api || exit /b
symfony server:stop
start /B symfony server:start --port=8000

rem Función para ejecutar npm run dev en la carpeta ux
:run_npm_dev
cd ../ux || exit /b
start /B npm run dev

rem Abrir el navegador predeterminado en localhost:5173
start "" "http://localhost:5173"
