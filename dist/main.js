(function (exports) {
  'use strict';

  const foo = 'hello world!';

  const main = function () {
    console.log(foo);
  };

  exports.main = main;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
