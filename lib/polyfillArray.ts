(() => {
  const proto = Array.prototype;

  if (!proto.fill) {
    proto.fill = function <T>(value: T, start?: number, end?: number): T[] {
      const O = Object(this);
      const len = O.length >>> 0;
      const relativeStart = start! >> 0;
      const relativeEnd = end === undefined ? len : end >> 0;

      let k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

      const final = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

      while (k < final) {
        O[k] = value;
        k++;
      }

      return O;
    };
  }
})();
