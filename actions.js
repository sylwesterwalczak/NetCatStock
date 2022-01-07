const { COLORS, CURRENT_TIME, ACTION, ITEM, MSG } = require("./utils.js");
const { users, transactoinQueue } = require("./values.js");

const checkValid = ({ user, actionType, actionItem }) => {
  const hasTwoArgs = actionType && actionItem;
  if (!hasTwoArgs) {
    sendMeg({ user, currentUser: MSG.WRONG_COMMAND });
    return false;
  }

  if (!Object.keys(ACTION).some((actions) => actions === actionType)) {
    sendMeg({
      user,
      currentUser: MSG.WRONG_ACTION,
    });
    return false;
  }

  if (!Object.keys(ITEM).some((item) => item === actionItem)) {
    sendMeg({
      user,
      currentUser: MSG.WRONG_ITEM,
    });
    return false;
  }
  return true;
};

const createTransaction = ({ type, item, user }) => {
  //item tpye jako mala
  const callType = ACTION[type];
  const callItem = ITEM[item];
  const searchedType = callType === ACTION.buy ? ACTION.sell : ACTION.buy;

  // sprawdzic czy jest taka przeciena strnackja w kolejce
  const findedElement = transactoinQueue.find(
    ({ item: objItem, type: objType }) =>
      objItem === callItem && objType === searchedType
  );

  // jezeli jest wyjac ja z kolejki i wyswielitc powiadomeinie
  if (findedElement) {
    const newQueue = transactoinQueue.filter(
      ({ id: objId }) => objId !== findedElement.id
    );
    transactoinQueue = [...newQueue];
    sendMeg({
      user,
      hostMsg: `${CURRENT_TIME} ${MSG.NEW} ${callType} order > ${user} :  ${item}`,
    });
    sendMeg({
      user,
      hostMsg: `${CURRENT_TIME} ${MSG.TRADE} ${callItem}`,
      currentUser: `${COLORS.green} ${ACTION.trade}:${callItem}`,
      allUsers: `${COLORS.green} ${ACTION.trade}:${callItem}`,
    });
    return;
  }
  // jezeli nie dodac nowa do kolejki

  transactoinQueue.push({
    id: new Date(),
    user,
    item: callItem,
    type: callType,
  });

  sendMeg({
    user,
    hostMsg: `${CURRENT_TIME} ${MSG.NEW} ${callType} order > ${user} :  ${item}`,
    currentUser: `${ACTION.ack}:${callItem}`,
  });
};
const sendMeg = ({ user, hostMsg, currentUser, allUsers }) => {
  const _client = users[user];
  if (allUsers || currentUser)
    Object.keys(users).forEach((user) => {
      const otherClient = users[user];
      if (_client === otherClient && currentUser) {
        //  wyslana wiadomsc zamawiajacego
        const _msg = `${currentUser}\r\n`;
        _client.write(_msg);
        if (currentUser === allUsers) return;
      }
      //  wyslana wiadomsc do kazdego
      if (allUsers) {
        const _msg = `${allUsers}\r\n`;
        otherClient.write(_msg);
      }
    });
  //  wyslana wiadomsc do hosta
  if (hostMsg) console.log(hostMsg);
};
const showItems = () => {
  const items = [];
  Object.values(ITEM).forEach((itemName) => {
    transactoinQueue.forEach((item) => {
      if (item.item === itemName) items.push({ [item.type]: item.item });
    });
  });
  return items;
};
module.exports = { checkValid, createTransaction, sendMeg, showItems };
