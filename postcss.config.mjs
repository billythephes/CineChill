// const withMT = require("@material-tailwind/react/utils/withMT");
import withMT from "@material-tailwind/react/utils/withMT.js";
 
export default withMT({
  content: [],
  theme: {
    extend: {},
  },
  plugins: ["@tailwindcss/postcss"],
});

// module.exports = withMT({
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// });

// const config = {
//   plugins: ["@tailwindcss/postcss"],
// };

// export default config;