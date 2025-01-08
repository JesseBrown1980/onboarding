const { createProxyMiddleware } = require("http-proxy-middleware");

const port = process.env.BE_PORT || 8080;
const host = process.env.BE_HOST || "http://localhost";

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: `${host}:${port}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/auth",
    createProxyMiddleware({
      target: `${host}:${port}`,
      changeOrigin: true,
    })
  );
};
