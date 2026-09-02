export interface PermissionRules {
  canDownloadWithoutPayment: boolean;
  hasWatermark: boolean;
  unlimitedDownloads: boolean;
  badgeLabel: string;
}

/**
 * Evalúa los permisos de exportación según el rol de la sesión.
 * Cuentas B2B / Centro de Internet no pagan por descarga y no llevan marca de agua.
 */
export function getExportPermissions(isB2B: boolean): PermissionRules {
  if (isB2B) {
    return {
      canDownloadWithoutPayment: true,
      hasWatermark: false,
      unlimitedDownloads: true,
      badgeLabel: 'ACCESO EMPRESARIAL B2B',
    };
  }

  return {
    canDownloadWithoutPayment: false,
    hasWatermark: true, // Marca de agua en vista previa hasta realizar el pago
    unlimitedDownloads: false,
    badgeLabel: 'USUARIO ESTÁNDAR',
  };
}