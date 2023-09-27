let handler;

export default {
  install(app) {
    app.directive("click-outside", {
      mounted(el, binding) {
        handler = (e) => {
          let current = e.target;
          while (current) {
            if (current !== el) current = current.parentNode;
            else return;
          }

          binding.value();
        };

        document.addEventListener("click", handler);
      },
      unmounted() {
        document.removeEventListener("click", handler);
      },
    });
  },
};
