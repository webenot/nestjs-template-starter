export const convertStringToBoolean = (string: string): boolean => {
  switch (string.toLowerCase().trim()) {
    case 'true':
      return true;
    case 'false':
    case undefined:
      return false;
    default:
      return Boolean(string);
  }
};

export const replaceAll = (string: string, search: string, replaceWith: string): string =>
  string.split(search).join(replaceWith);
