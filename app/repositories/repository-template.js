class RepositoryTemplate {
  constructor(model) {
    this._model = model;
  }

  async findAll() {
    return this._model.findAll();
  }

  async findById(id) {
    return this._model.findOne({
      where: {
        id: id,
      },
    });
  }

  async findAllWithIncludesInnerJoin() {
    return this._model.findAll({
      include: [
        {
          required: true,
          all: true,
          nested: true,
        },
      ],
    });
  }

  async findAllWithIncludesLeftJoin() {
    return this._model.findAll({
      include: [
        {
          required: false,
          all: true,
          nested: true,
        },
      ],
    });
  }

  async save(data) {
    return this._model.create(data);
  }

  async update(id, data) {
    return this._model.update(data, {
      where: {
        id: id,
      },
    });
  }

  async remove(id) {
    return this._model.destroy({ where: { id: id } });
  }
}

module.exports = RepositoryTemplate;
