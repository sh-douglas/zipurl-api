import Url from "../models/Url.js";

class UrlRepository {
  async create(longUrl, shortUrl, userId) {
    return await Url.create({ longUrl, shortUrl, userId });
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

  async findByShortCode(shortUrl) {
    return await Url.findOne({ where: { shortUrl: shortUrl } });
  }
}

export default new UrlRepository();
