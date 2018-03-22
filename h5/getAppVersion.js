import { isFudaoApp } from './index';

const getAppVersion = function () {
  if (!isFudaoApp()) { return 0; }
  const version = (/VersionCode\/(\d+)/.exec(navigator.userAgent) || [])[1];
  return version || 0;
};

export default getAppVersion;

