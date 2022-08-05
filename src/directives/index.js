export const errorImg = {
  inserted(el, { value }) {
    el.onerror = () => {
      el.src = value;
    };
  },
};
