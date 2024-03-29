'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Likes.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      Likes.belongsTo(models.Post, { foreignKey: 'postId' })
    }
  }
  Likes.init(
    {
      postId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Likes'
    }
  )


  Likes.afterCreate(async (like, options) => {
    const transaction = await sequelize.transaction();
    try {
      const post = await like.getPost({ transaction });
      await post.update({
        likesCount: post.likesCount + 1
      }, { transaction });
      await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error; 
    }
  });

  Likes.afterDestroy(async (like, options) => {
    const transaction = await sequelize.transaction();
    try {
      const post = await like.getPost({ transaction });
      const newLikesCount = Math.max(post.likesCount - 1, 0);
      await post.update({
        likesCount: newLikesCount
      }, { transaction });
      await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
  });

  return Likes;
}