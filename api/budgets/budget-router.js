const express = require('express')
const Budget = require('./budget-model.js')

const router = express.Router()

async function checkID(req, res, next)
{
  const { id } = req.params
  const idExists = await Budget.getById(id)
  if (idExists) {
    next()
  } else {
    res.status(400).json({message: "ID does not exist in the database."})
  }
}

function checkPayload(req, res, next) 
{
  const { name, budget } = req.body
  if (name && budget) {
    next()
  } else {
    res.status(400).json({ message: "Name and Budget are required." })
  }
}

router.get('/', async (__, res) => {
  try {
    const data = await Budget.get()
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', checkID, async (req, res) => {
  try {
    const { id } = req.params
    const data = await Budget.getById(id)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.post("/", checkPayload, async (req, res) => {
  try {
    const budget = req.body
    const data = await Budget.create(budget)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.put("/:id", checkPayload, checkID, async (req, res) => {
  try {
    const { id } = req.params
    const budgetChanges = req.body
    const data = await Budget.update(id, budgetChanges)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.delete("/", checkID, async (req, res) => {
  try {
    const { id } = req.params
    const data = await Budget.remove(id)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.use((err, req, res, next) => {
  res.status(500).json({message: err.message, stack: err.stack })
})

module.exports = router