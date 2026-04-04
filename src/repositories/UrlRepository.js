import Url from "../models/Url.js";

class UrlRepository {
  async create(title, description, longUrl, shortCode, userId) {
    return await Url.create({ title, description, longUrl, shortCode, userId });
  }

  async findAll(userId) {
    return await Url.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
  }

  async findById(id, userId) {
    return await Url.findOne({ where: { id, userId } });
  }

  async update(id, data, userId) {
    return await Url.update(data, {
      where: { id, userId },
    });
  }

  async delete(id, userId) {
    return await Url.destroy({ where: { id, userId } });
  }

  async findByShortCode(shortCode) {
    return await Url.findOne({ where: { shortCode: shortCode } });
  }
}

export default new UrlRepository();
