"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. renomear shortUrl → shortCode
    await queryInterface.renameColumn("Urls", "shortUrl", "shortCode");

    // 2. adicionar title
    await queryInterface.addColumn("Urls", "title", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // 3. adicionar description
    await queryInterface.addColumn("Urls", "description", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // remover description
    await queryInterface.removeColumn("Urls", "description");

    // remover title
    await queryInterface.removeColumn("Urls", "title");

    // renomear de volta shortCode → shortUrl
    await queryInterface.renameColumn("Urls", "shortCode", "shortUrl");
  },
};
