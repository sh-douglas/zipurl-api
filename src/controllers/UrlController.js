import UrlService from "../services/UrlService.js";

class UrlController {
  async create(req, res, next) {
    try {
      const { title, description, longUrl } = req.body;
      const userId = req.user.id;
      const result = await UrlService.shorten(
        title,
        description,
        longUrl,
        userId,
      );

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const userId = req.user.id;
      const allUrl = await UrlService.findAll(userId);
      return res.status(200).json(allUrl);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const link = await UrlService.findById(id, userId);

      return res.status(200).json(link);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const updatedData = await UrlService.update(id, req.body, userId);

      return res.status(200).json(updatedData);
    } catch (error) {
      next(error);
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      await UrlService.delete(id, userId);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async handleRedirect(req, res, next) {
    try {
      const { shortCode } = req.params;

      const longUrl = await UrlService.getDestination(shortCode);

      return res.redirect(longUrl);
    } catch (error) {
      next(error);
    }
  }
}

export default new UrlController();
