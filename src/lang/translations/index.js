export default {
  ru: {
    name: 'ru',
    load: () => { return import('./ru.json'); },
  },
  en: {
    name: 'en',
    load: () => { return import('./en.json'); },
  },
};