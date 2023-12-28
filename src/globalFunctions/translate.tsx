export const translate = (key: string, lang: string, data: any) => {
  return data.reduce((acc: any, item: { [x: string]: any }) => {
    return acc + item[`${key}_${lang}` as keyof typeof item];
  }, "");
};
