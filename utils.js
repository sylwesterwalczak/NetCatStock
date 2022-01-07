const interfaces = require("os").networkInterfaces();

const MSG = {
  WRONG_ACTION: "[WRONG ACTION] Błędna akcja wybierz BUY: lub SELL: ",
  WRONG_COMMAND: "[WRONG COMMAND] Błędna komenda",
  WRONG_ITEM: "[WRONG ITEM] Nie ma obslugujemy tych tranasckji ",
  NEW: "[ NEW ]",
  ERROR: "[ ERROR ]",
  TRADE: "[ TRADE ]",
  CLIENT_LEFT: "[ CLIENT LEFT ]",
  CLIENT_JOINED: "[ CLIENT JOINED ]",
};

const COLORS = {
  red: "\x1b[31m%s\x1b[0m",
  green: "\x1b[32m%s\x1b[0m",
  yellow: "\x1b[33m%s\x1b[0m",
  blue: "\x1b[34m%s\x1b[0m",
  magenta: "\x1b[35m%s\x1b[0m",
  cyan: "\x1b[36m%s\x1b[0m",
};

const ACTION = {
  buy: "BUY",
  sell: "SELL",
  trade: "TRADE",
  ack: "ACK",
};

const ITEM = {
  honda: "HONDA",
  audi: "AUDI",
  seat: "SEAT",
  bmw: "BMW",
};

const ts = Date.now();

const addZeroBefore = (n) => {
  return (n < 10 ? "0" : "") + n;
};

const date_ob = new Date(ts);
const h = addZeroBefore(date_ob.getHours());
const m = addZeroBefore(date_ob.getMinutes());
const s = addZeroBefore(date_ob.getSeconds());
const CURRENT_TIME = `${h}:${m}:${s}`;

const getIPAddress = () => {
  for (let devName in interfaces) {
    const iface = interfaces[devName];

    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      )
        return alias.address;
    }
  }
  return "0.0.0.0";
};

module.exports = { COLORS, CURRENT_TIME, ACTION, ITEM, MSG, getIPAddress };
