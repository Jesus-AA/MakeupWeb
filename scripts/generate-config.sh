#!/usr/bin/env bash
# Genera js/config.js a partir de la variable de entorno FORMSPREE_ID.
# Se ejecuta como build command de Netlify (ver netlify.toml).
set -euo pipefail

if [ -z "${FORMSPREE_ID:-}" ]; then
  echo "ERROR: FORMSPREE_ID no esta definida."
  echo "Configurala en Netlify > Site settings > Environment variables."
  exit 1
fi

cat > js/config.js <<EOF
/* Archivo autogenerado en el build de Netlify - no editar manualmente */
const APP_CONFIG = {
    formspreeId: '${FORMSPREE_ID}'
};
EOF

echo "OK: js/config.js generado con FORMSPREE_ID"
