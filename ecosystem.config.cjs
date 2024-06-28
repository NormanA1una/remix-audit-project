module.exports = {
  apps: [
    {
      name: "remix",
      script: "export $(cat .env | xargs) && npm start",
    },
  ],
};
