'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Comments', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        postId: {
            type: Sequelize.INTEGER,
            references: {
            model: 'Posts', // Nom de la table telle qu'elle est définie dans la base de données
            key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
            model: 'Users', // Nom de la table telle qu'elle est définie dans la base de données
            key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Comments');
    }
};
