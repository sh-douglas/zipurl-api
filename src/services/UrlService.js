import z from "zod";
import { nanoid } from "nanoid";

import UrlRepository from "../repositories/UrlRepository.js";
import AppError from "../errors/AppError.js";

const UrlSchema = z.object({
  longUrl: z.string().url(),
});

class UrlService {
  async shorten(longUrl, userId) {
    const cleanData = UrlSchema.parse({ longUrl });

    const shortUrl = nanoid(6);
    const newUrl = await UrlRepository.create(
      cleanData.longUrl,
      shortUrl,
      userId,
    );

    return this.formatUrl(newUrl);
  }

  async findAll(userId) {
    const allUrl = await UrlRepository.findAll(userId);

    const urls = allUrl.map((url) => this.formatUrl(url));

    return urls;
  }

  async findById(id, userId) {
    const link = await UrlRepository.findById(id, userId);

    if (!link) {
      throw new AppError("Link não encontrado!", 404);
    }

    return this.formatUrl(link);
  }

  async update(id, data, userId) {
    const url = await UrlRepository.findById(id, userId);

    if (!url) {
      throw new AppError("Link não encontrado!", 404);
    }

    const cleanData = UrlSchema.parse(data);

    await UrlRepository.update(id, cleanData, userId);

    const newData = await UrlRepository.findById(id, userId);

    return this.formatUrl(newData);
  }

  async delete(id, userId) {
    const urlToDelete = await UrlRepository.findById(id, userId);

    if (!urlToDelete) {
      throw new AppError("Link não encontrado!", 404);
    }

    await UrlRepository.delete(id, userId);
  }

  async getDestination(shortUrl) {
    const urlData = await UrlRepository.findByShortCode(shortUrl);

    if (!urlData) {
      throw new AppError("Link não encontrado!", 404);
    }

    return urlData.longUrl;
  }

  formatUrl(url) {
    const { id: urlId, shortUrl, longUrl, createdAt, updatedAt } = url.toJSON();

    return {
      urlId,
      shortUrl,
      longUrl,
      createdAt,
      updatedAt,
      fullShortUrl: `${process.env.BASE_URL}/${shortUrl}`,
    };
  }
}

export default new UrlService();
