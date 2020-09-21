class RepositoryTemplate {
  constructor(model) {
    console.log("CONSTRUCTOR repo-template");
    console.log(model);
    this._model = model;
  }

  async findAll() {
    try {
      console.log("DENTRO DO FINDALL() repo-template")
      console.log(this);
      return await this._model.findAll();
    } catch (error) {
      console.log(error);
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
