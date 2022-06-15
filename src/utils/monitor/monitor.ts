export function getSelector(pathsOrTarget: any) {
  let path: any[] = [];
  if (Array.isArray(pathsOrTarget)) {
    path = pathsOrTarget;
  } else {
    while (pathsOrTarget) {
      path.push(pathsOrTarget);
    }
  }

  return path
    .reverse()
    .filter((element) => element !== document && element !== window)
    .map((element) => {
      let selector = '';
      if (element.id) {
        return `${element.nodeName.toLowerCase()}#${element.id}`;
      } if (element.className && typeof element.className === 'string') {
        return `${element.nodeName.toLowerCase()}.${element.className}`;
      }
      selector = element.nodeName.toLowerCase();

      return selector;
    })
    .join(' ');
}

export function getLines(stack: string) {
  return stack
    .split('\n')
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ''))
    .join('^');
}

export let lastEvent: Event | null = null;

(function getLastEvent() {
  if (lastEvent) {
    return;
  }
  ['click', 'touchstart', 'mousedown', 'keydown', 'mouseover'].forEach(
    (eventType) => {
      document.addEventListener(
        eventType,
        (event) => {
          lastEvent = event;
        },
        {
          capture: true, // 是在捕获阶段还是冒泡阶段执行
          passive: true, // 默认不阻止默认事件
        },
      );
    },
  );
}());
