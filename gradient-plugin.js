// extracting gradients
// https://github.com/jkphl/svg-sprite/issues/74

const { DOMParser } = require('xmldom');

const createGradientExtract = (index) => {
  const defs = new DOMParser().parseFromString('<defs></defs>');
  let count = 0;

  /**
 * Extracts specific gradient defined by tag from given shape.
 * @param {SVGShape} shape
 * @param {string} tag
 * @return {Array}
 */
  function extractGradients(shape, tag) {
    const idsToReplace = [];

    const gradients = shape.dom.getElementsByTagName(tag);
    while (gradients.length > 0) {
    // Add gradient to defs block
      defs.documentElement.appendChild(gradients[0]);

      // Give gradient new ID
      const id = gradients[0].getAttribute('id');
      const newId = `g${index}-${++count}`;
      gradients[0].setAttribute('id', newId);

      idsToReplace.push([id, newId]);
    }

    return idsToReplace;
  }

  /**
   * Escape regex characters in given string
   * @param {string} str
   * @return {string}
   */
  function regexEscape(str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  /**
   * Updates urls in given SVG from array of [oldId, newId].
   * @param {string} svg
   * @param {Array} idsToReplace
   * @return {string}
   */
  function updateUrls(svg, idsToReplace) {
    for (let i = 0; i < idsToReplace.length; i++) {
      const str = `url(#${idsToReplace[i][0]})`;
      svg = svg.replace(
        new RegExp(regexEscape(str), 'g'),
        `url(#${idsToReplace[i][1]})`,
      );
    }

    return svg;
  }

  /**
 * Extracts gradient from the sprite and replaces their ids to prevent duplicates.
 * @param {SVGShape} shape
 * @param {SVGSpriter} spriter
 * @param {Function} callback
 */
  function gradientsExtraction(shape, spriter, callback) {
    const idsToReplace = [].concat(
      extractGradients(shape, 'linearGradient'),
      extractGradients(shape, 'radialGradient'),
    );

    shape.setSVG(updateUrls(shape.getSVG(), idsToReplace));

    callback(null);
  }

  return {
    gradientsExtraction,
    defs,
  };
};

exports.createGradientExtract = createGradientExtract;
// exports.gradientsExtraction = gradientsExtraction;
// exports.defs = defs;
