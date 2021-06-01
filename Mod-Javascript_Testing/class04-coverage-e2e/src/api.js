const http = require("http");
const DEFAULT_USER = { username: "Fernando Silva", password: "123" };

const routes = {
  "/contact:get": (req, res) => {
    res.write("Contact Us page");
    return res.end();
  },

  "/login:post": async (req, res) => {
    // response is an iterator !
    for await (const data of req) {
      const user = JSON.parse(data);

      if (
        user.username !== DEFAULT_USER.username ||
        user.password !== DEFAULT_USER.password
      ) {
        res.writeHead(401);
        res.write("Logging has failed!");
        return res.end();
      }

      res.write("Logging has completed successfully");
      return res.end();
    }
  },

  default: (req, res) => {
    res.write("Hi There");
    return res.end();
  },
};

const handler = (req, res) => {
  const { url, method } = req;
  const routeKey = `${url}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;

  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  return chosen(req, res);
};

const PORT = process.env.PORT || 3000;

const app = http.createServer(handler).listen(PORT, () => {
  console.log(`🔥 The server is running on port: ${PORT}`);
});

module.exports = app;
