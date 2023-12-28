export const removeHtmlTags = (text: string) => {
  return text && text.replace(/<\/?[^>]+(>|$)|&nbsp;/g, "");
};
