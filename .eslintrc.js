module.exports = {
  extends: ["next", "next/core-web-vitals"],
  rules: {
    "import/no-unused-modules": [
      "error",
      {
        unusedExports: true,
        ignoreExports: [
          "**/src/app/**", // Ignora todas las rutas en src/app
        ],
      },
    ],
  },
};
