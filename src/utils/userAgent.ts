interface IBrowserReg {
  [Chrome: string]: RegExp,
  IE: RegExp,
  Firefox: RegExp,
  Opera: RegExp,
  Safari: RegExp,
  360: RegExp,
  QQBrowser: RegExp,
}
interface IDeviceReg {
  [iPhone: string]: RegExp,
  Android: RegExp,
  iPad: RegExp,
  Windows: RegExp,
  Mac: RegExp,
}

export default () => {
  const browserReg:IBrowserReg = {
    Chrome: /Chrome/,
    IE: /MSIE/,
    Firefox: /Firefox/,
    Opera: /Presto/,
    Safari: /Version\/([\d.]+).*Safari/,
    360: /360SE/,
    QQBrowser: /QQ/,
  };
  const deviceReg:IDeviceReg = {
    iPhone: /iPhone/,
    iPad: /iPad/,
    Android: /Android/,
    Windows: /Windows/,
    Mac: /Macintosh/,
  };
  const userAgentStr = navigator.userAgent;
  const userAgentObj = {
    browserName: '', // 浏览器名称
    browserVersion: '', // 浏览器版本
    osName: '', // 操作系统名称
    osVersion: '', // 操作系统版本
    deviceName: '', // 设备名称
  };

  function getBrowserVersion(key: string) {
    switch (key) {
      case 'Chrome':
        return userAgentStr.split('Chrome/')[1].split(' ')[0];
      case 'IE':
        return userAgentStr.split('MSIE ')[1].split(' ')[1];
      case 'Firefox':
        return userAgentStr.split('Firefox/')[1];
      case 'Opera':
        return userAgentStr.split('Version/')[1];
      case 'Safari':
        return userAgentStr.split('Version/')[1].split(' ')[0];
      case 'QQBrowser':
        Object.defineProperty(userAgentObj, 'deviceName', {
          value: userAgentStr.split('(Linux; Android ')[1].split('; ')[1].split(' Build')[0],
        });
        return userAgentStr.split('Version/')[1].split(' ')[0];
      default:
        return '';
    }
  }

  function getOSVersion(key: string) {
    switch (key) {
      case 'Windows':
        return userAgentStr.split('Windows NT ')[1].split(';')[0];
      case 'Mac':
        return userAgentStr.split('Mac OS X ')[1].split(')')[0];
      case 'iPhone':
        return userAgentStr.split('iPhone OS ')[1].split(' ')[0];
      case 'iPad':
        return userAgentStr.split('iPad; CPU OS ')[1].split(' ')[0];
      case 'Android':
        return userAgentStr.split('Android ')[1].split(';')[0];
      default:
        return '';
    }
  }

  Object.keys(browserReg).forEach((key) => {
    if (browserReg[key].test(userAgentStr)) {
      userAgentObj.browserName = key;
      Object.defineProperty(userAgentObj, 'browserVersion', {
        value: getBrowserVersion(key),
      });
    }
  });

  Object.keys(deviceReg).forEach((key) => {
    if (deviceReg[key].test(userAgentStr)) {
      userAgentObj.osName = key;
      Object.defineProperty(userAgentObj, 'osVersion', {
        value: getOSVersion(key),
      });
    }
  });
  return userAgentObj;
};
