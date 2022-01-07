("use strict");

const net = require("net");
const { COLORS, MSG, getIPAddress } = require("./utils.js");
const { checkValid, createTransaction } = require("./actions.js");
const { users } = require("./values.js");
let server;

try {
  const dataClient = ({ chunk, user }) => {
    const commd = chunk.toString("utf8").toLowerCase().trim();
    const actionType = commd.split(":")[0];
    const actionItem = commd.split(":")[1];
    if (checkValid({ user, actionType, actionItem }))
      createTransaction({ type: actionType, item: actionItem, user });
  };

  const endClient = (user) => {
    console.log(COLORS.red, `${MSG.CLIENT_LEFT}  ${user}`);
  };

  const handleClient = (client) => {
    const addr = client.remoteAddress;
    const port = client.remotePort;
    const user = `${addr}:${port}`;
    users[user] = client;
    console.log(COLORS.green, `${MSG.CLIENT_JOINED} ${user}`);
    client.on("data", (chunk) => dataClient({ chunk, user }));
    client.on("end", () => endClient({ user }));
  };

  const onListening = () => {
    console.log("Started listen on", getIPAddress(), server.address());
  };

  server = net.createServer(handleClient);
  server.listen(4000, onListening);
} catch (e) {
  console.log(`${MSG.ERROR}`, e);
}
