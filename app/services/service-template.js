"use strict";

class ServiceTemplate {
  constructor(repo) {
    console.log("service - ServiceTemplate - constructor");
    console.log(repo);
    this._repo = repo;
  }

  async findAll() {
    try {
      return await this._repo.findAll();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findById(id) {
    try {
      return await this._repo.findById(id);
    } catch (e) {
      throw e;
    }
  }

  async save(data) {
    try {
      return await this._repo.save(data);
    } catch (e) {
      throw e;
    }
  }

  async update(data, id) {
    try {
      return await this._repo.update(data, id);
    } catch (e) {
      throw e;
    }
  }

  async remove(id) {
    try {
      return this._repo.destroy(id);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = ServiceTemplate;
