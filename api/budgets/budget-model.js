const db = require("../../data/db-config.js");

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

function get() {
  return db("budget0")
}

function getById(id) {
  return db("budget0").where("id", id).first()
  // return the budget database where id is id and the first item to match
}

function create(accounts) {
  return db("budget0").insert(accounts)
    //return the budget database where we insert into a new "accounts".
    .then(([id]) => {
      //pull out the id from the new "accounts" 
      return db(accounts).where("id", id).first()
      //return only that account with the id of the new account, if you'd rather see all accounts, the first line of code is good enough.
    })
}

function update(id, newItem) {
  const budgetID = id
  return db("budget0").where("id", id).update(newItem)
    .then(() => {
    return db("budget0").where("id", id).first()
  })
}

function remove(id) {
  return db("budget0").where("id", id).del()
    .then(() => {
    return db("budget0")
  })
}