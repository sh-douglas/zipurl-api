import z from "zod";
import { nanoid } from "nanoid";

import UrlRepository from "../repositories/UrlRepository.js";
import AppError from "../errors/AppError.js";

const CreateUrlSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  longUrl: z.string().url(),
});

const UpdatedUrlSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  longUrl: z.string().url().optional(),
});

class UrlService {
  async shorten(data, userId) {
    const cleanData = CreateUrlSchema.parse(data);
    const finalTitle = cleanData.title ?? new URL(cleanData.longUrl).hostname;
    const finalDescription = cleanData.description ?? null;

    const shortCode = nanoid(6);
    const newUrl = await UrlRepository.create(
      finalTitle,
      finalDescription,
      cleanData.longUrl,
      shortCode,
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

    const cleanData = UpdatedUrlSchema.parse(data);

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

  async getDestination(shortCode) {
    const urlData = await UrlRepository.findByShortCode(shortCode);

    if (!urlData) {
      throw new AppError("Link não encontrado!", 404);
    }

    return urlData.longUrl;
  }

  formatUrl(url) {
    const {
      id: urlId,
      title,
      description,
      shortCode,
      longUrl,
      createdAt,
      updatedAt,
    } = url.toJSON();

    return {
      urlId,
      title,
      description,
      shortCode,
      longUrl,
      createdAt,
      updatedAt,
      fullShortUrl: `${process.env.BASE_URL}/${shortCode}`,
    };
  }
}

export default new UrlService();
