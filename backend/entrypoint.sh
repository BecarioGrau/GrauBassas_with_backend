#!/bin/sh

# Salir inmediatamente si un comando falla
set -e


echo "Aplicando migraciones..."
python manage.py migrate --noinput

echo "Sincronizando catálogo desde archivos JSON..."
python manage.py load_json_catalog

echo "Recopilando archivos estáticos..."
python manage.py collectstatic --noinput

# Crear superusuario si las variables están presentes
if [ "$DJANGO_SUPERUSER_USERNAME" ] && [ "$DJANGO_SUPERUSER_EMAIL" ] && [ "$DJANGO_SUPERUSER_PASSWORD" ]; then
    echo "Creando superusuario..."
    python manage.py createsuperuser --noinput || echo "El superusuario ya existe o no se pudo crear."
fi

echo "Iniciando Gunicorn..."
exec gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 2
