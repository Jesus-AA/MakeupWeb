/* ====================================
   CONFIGURACION - Documentacion
   ====================================
   En Netlify, js/config.js se genera AUTOMATICAMENTE
   durante el build a partir de la variable de entorno
   FORMSPREE_ID (ver scripts/generate-config.sh).

   Pasos para desplegar:
   1. En Netlify > Site settings > Environment variables
      crea la variable FORMSPREE_ID con el ID de Formspree.
   2. Redeploy (commit + push, o "Trigger deploy").

   Para DESARROLLO LOCAL, crea js/config.js a mano:
   const APP_CONFIG = { formspreeId: 'tu-id' };
   ==================================== */

const APP_CONFIG = {
    formspreeId: 'your-form-id-here'
};
