const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  // Copy reveal.js dist files to the output
  eleventyConfig.addPassthroughCopy({
    "node_modules/reveal.js/dist": "reveal.js/dist",
    "node_modules/reveal.js/plugin": "reveal.js/plugin",
  });

  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/images");

  // Add r-fit-text class to h1 and h2 in presentation output
  eleventyConfig.addTransform("fit-text", function (content) {
    if (this.outputPath && this.outputPath.includes("presentatie")) {
      content = content.replace(/<(h[12])([^>]*)>/g, (match, tag, attrs) => {
        if (attrs.includes("r-fit-text")) return match;
        if (attrs.includes('class="')) {
          return match.replace('class="', 'class="r-fit-text ');
        }
        return `<${tag} class="r-fit-text"${attrs}>`;
      });
    }
    return content;
  });

  // Collection: presentation slides sorted by filename
  eleventyConfig.addCollection("slides", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/presentation/*.md")
      .sort((a, b) => {
        const aName = path.basename(a.inputPath);
        const bName = path.basename(b.inputPath);
        return aName.localeCompare(bName);
      });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
