const PERMISSION = {
  READ: 1,
  WRITE: 2,
  UPDATE: 3,
  DELETE: 4,
};

const USER_TYPES = {
  ADMIN: 1,
  DATAWRITER: 2,
  REGISTERED:3,
  GENERAL: 4,
};

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

module.exports = { PERMISSION, USER_TYPES, getKeyByValue };
