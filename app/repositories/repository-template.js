class RepositoryTemplate {
  constructor(model) {
    this._model = model();
  }

  async findAll() {
    try {
      return await this._model.findAll();
    } catch (error) {
      throw Error(error);
    }
  }

  async findById(id) {
    try {
      return await this._model.findAll({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw Error(error);
    }
  }

  async save(data) {
    try {
      return await this._model.create(data);
    } catch (error) {
      throw Error(error);
    }
  }

  async update(id, data) {
    try {
      return await this._model.update(data, {
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw Error(error);
    }
  }

  async remove(id) {
    try {
      return this._model.destroy({ where: { id: id } });
    } catch (error) {
      throw Error(error);
    }
  }
}

module.exports = RepositoryTemplate;
