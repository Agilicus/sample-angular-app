import { AuthConfig } from 'angular-oauth2-oidc';
import { environment as env } from '../environments/environment'

function authHost(): string {
  if (env['overrideDomain']) {
    return "auth." + env['overrideDomain'];
  }

  const hostname = window.location.hostname;
  const firstPeriod = hostname.indexOf(".");
  return "auth" + "." + hostname.substring(firstPeriod + 1);
}

export const authConfig: AuthConfig = {
  issuer: 'https://' + authHost() + '/',
  redirectUri: window.location.origin + '/',
  clientId: 'egov.city',
  scope: 'openid profile email federated:id',
}
