"use strict";

class ServiceTemplate {
  constructor(repo) {
    this._repo = repo;
  }

  async findAll() {
      return this._repo.findAll();
  }

  async findById(id) {
      return this._repo.findById(id);
  }

  async save(data) {
      return this._repo.save(data);
  }

  async update(data, id) {
      return this._repo.update(data, id);
  }

  async remove(id) {
      return this._repo.destroy(id);
  }
}

module.exports = ServiceTemplate;
