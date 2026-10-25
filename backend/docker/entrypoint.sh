#!/bin/sh
set -e

export PORT="${PORT:-80}"

# Substitute Railway's runtime PORT into the nginx template before starting.
envsubst '$PORT' < /etc/nginx/http.d/default.conf > /etc/nginx/http.d/default.conf.tmp
mv /etc/nginx/http.d/default.conf.tmp /etc/nginx/http.d/default.conf

exec /usr/bin/supervisord -c /etc/supervisord.conf