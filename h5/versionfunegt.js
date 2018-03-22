function versionfunegt(ver1, ver2) {
  const version1pre = parseFloat(ver1);
  const version2pre = parseFloat(ver2);
  const version1next = Number(ver1.replace(`${version1pre}.`, ''));
  const version2next = Number(ver2.replace(`${version2pre}.`, ''));
  if (version1pre > version2pre) {
    return true;
  } else if (version1pre < version2pre) {
    return false;
  } else {
    if (version1next >= version2next) {
      return true;
    } else {
      return false;
    }
  }
}

export default versionfunegt;
