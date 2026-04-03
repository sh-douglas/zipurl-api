import z from "zod";
import { nanoid } from "nanoid";

import UrlRepository from "../repositories/UrlRepository.js";
import AppError from "../errors/AppError.js";

const UrlSchema = z.object({
  title: z.string().optional(),
  longUrl: z.string().url(),
  description: z.string().optional(),
});

const PartialUrlSchema = UrlSchema.partial();

class UrlService {
  async shorten(longUrl, userId) {
    const cleanData = UrlSchema.parse({ longUrl });

    const shortUrl = nanoid(6);
    const newUrl = await UrlRepository.create(
      cleanData.longUrl,
      shortUrl,
      userId,
    );

    const { id, longUrl: originalUrl, createdAt, updatedAt } = newUrl.toJSON();

    return {
      id,
      originalUrl,
      shortUrl,
      createdAt,
      updatedAt,
      fullShortUrl: `${process.env.BASE_URL}/${shortUrl}`,
    };
  }

  async findAll(userId) {
    const allUrl = await UrlRepository.findAll(userId);

    const urls = allUrl.map((url) => {
      const {
        id: urlId,
        shortUrl,
        longUrl,
        createdAt,
        updatedAt,
      } = url.toJSON();

      return {
        urlId,
        shortUrl,
        longUrl,
        createdAt,
        updatedAt,
        fullShortUrl: `${process.env.BASE_URL}/${shortUrl}`,
      };
    });

    return urls;
  }

  async findById(id, userId) {
    const link = await UrlRepository.findById(id, userId);

    if (!link) {
      throw new AppError("Link não encontrado!", 404);
    }

    const {
      id: urlId,
      shortUrl,
      longUrl,
      createdAt,
      updatedAt,
    } = link.toJSON();

    return {
      urlId,
      shortUrl,
      longUrl,
      createdAt,
      updatedAt,
      fullShortUrl: `${process.env.BASE_URL}/${shortUrl}`,
    };
  }

  async update(id, data, userId) {
    const url = await UrlRepository.findById(id, userId);

    if (!url) {
      throw new AppError("Link não encontrado!", 404);
    }

    const cleanData = PartialUrlSchema.parse(data);

    await UrlRepository.update(id, cleanData, userId);

    const newData = await UrlRepository.findById(id, userId);

    const { id: urlId, shortUrl, longUrl, updatedAt } = newData.toJSON();

    return {
      urlId,
      shortUrl,
      longUrl,
      updatedAt,
      fullShortUrl: `${process.env.BASE_URL}/${shortUrl}`,
    };
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
}

export default new UrlService();
