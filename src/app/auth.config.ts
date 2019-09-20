import { AuthConfig } from 'angular-oauth2-oidc';
import { DynamicEnvironmentService } from './dynamic-environment.init';

const env = new DynamicEnvironmentService();

function baseHost(): string {
  if (env.environment['overrideDomain']) {
    return env.environment['overrideDomain'];
  }

  const hostname = window.location.hostname;
  const firstPeriod = hostname.indexOf(".");
  return hostname.substring(firstPeriod + 1);
}

function authHost(): string {
    return "auth." + baseHost();
}

export const authConfig: AuthConfig = {
  issuer: 'https://' + authHost() + '/',
  redirectUri: window.location.origin + '/',
  clientId: baseHost(),
  scope: 'openid profile email federated:id',
}

const x = authConfig;
