  const router = require('express').Router()
  const controller = require('./controller')

  // для получения списка ресурсов
  router.get('/', (req, res) => controller.list(req.params, req.params.limit, res))

  // для получения ресурса
  router.get('/:id', (req, res) => controller.get(req.params.id, res))

  // для создания ресурса. принимает только весь ресурс целиком
  router.post('/', (req, res) => controller.store(req.body, res))

  // для полного изменения ресурса. принимает только весь ресурс целиком
  router.put('/:id', (req, res) => controller.save(req.params.id, req, res))

  // для частичного изменения ресурса. принимает только те части ресурса, которые нужно изменить
  router.patch('/:id', (req, res) => controller.update(req.params.id, req, res))

  // для удаления ресурса
  router.delete('/:id', (req, res) => controller.remove(req.params.id, res))

  module.exports = router