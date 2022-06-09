import { Component, h } from 'vue';
import { RouterLink } from 'vue-router';
import { NIcon } from 'naive-ui';
import Icon from '../components/Icon.vue';

export function renderLabel(label: string, path = '/') {
  return h(
    RouterLink,
    {
      to: {
        path,
      },
    },
    { default: () => label || '' },
  );
}

export function renderIcon(name: string | Component) {
  return () => h(NIcon, null, {
    default: () => (typeof name === 'string' ? h(
      Icon,
      {
        name,
      },
    ) : h(
      name,
    )),
  });
}
