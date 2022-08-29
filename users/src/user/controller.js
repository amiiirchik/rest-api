const UserModel = require('./model')

class User {
  async get(id, res) {
    let result = UserModel.findById(id)
      .then(user => res.status(200).json(user))
      .catch(err => res.status(404).json(err))
  }

  list(criterias, limit, res) {
    UserModel.find()
      .then(users => res.status(200).json({users}))
      .catch(err => res.status(400).json(err))
  }

  store(data, res) {
    let user = new UserModel
    user.name = data.name
    user.phone = data.phone
    user.save()
    .then((user) => res.status(201).json(user))
    .catch((error) => res.status(400).json(err))
  }

  save(id, data, res) {
    UserModel.findById(id)
      .then((model) => {
        return Object.assign(model, {
          name: data.name,
          phone: data.phone
        })
      }).then((model) => {
        return model.save()
      }).then((updatedModel) => {
        res.status(204).json(updatedModel)
      }).catch((err) => {
        res.status(400).send(err)
      })
  }

  update(id, data, res) {

  }

  remove(id, res) {

  }
}

module.exports = new User