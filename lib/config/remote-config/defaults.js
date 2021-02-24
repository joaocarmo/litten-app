/**
 * @format
 * @flow
 */

export const BETA_ENABLED = 'betaEnabled'
export const MAINTENANCE_MODE = 'maintenanceMode'
export const VERSION_DISABLED = 'versionDisabled'

export type AppConfigDefaults = {
  [key: string]: boolean,
}

const configDefaults: AppConfigDefaults = {
  [BETA_ENABLED]: true,
  [MAINTENANCE_MODE]: false,
  [VERSION_DISABLED]: false,
}

export default configDefaults
