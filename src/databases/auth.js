const Models = require('../models');

class DBAuth {
  constructor() {
    this.UsersModel = Models.Users;
  }

  async findAll(offset, limit) {
    return this.UsersModel
      .findAndCountAll({
        order: [['createdAt', 'DESC']],
        attributes: ['id'],
        limit,
        offset,
        raw: true,
      })
      .then((users) => ({
        count: users.count,
        rows: users.rows.map(
          (users.rows, (user) => user.id),
        ),
      }));
  }

  async findById(id) {
    return this.UsersModel
      .findOne({
        where: { id: parseInt(id, 10) },
        raw: true,
      })
      .then((user) => user);
  }

  async findByEmail(email) {
    return this.UsersModel
      .findOne({
        where: { email },
        raw: true,
      })
      .then((user) => user);
  }

  async create(user) {
    return this.UsersModel
      .create(user)
      .then((result) => result);
  }

  async update(id, user) {
    return this.UsersModel
      .update(user, {
        where: {
          id,
        },
      })
      .then((result) => result);
  }

  async deleteById(id) {
    return this.UsersModel
      .destroy({
        where: {
          id: parseInt(id, 10),
        },
      })
      .then((result) => result);
  }
}

module.exports = DBAuth;
