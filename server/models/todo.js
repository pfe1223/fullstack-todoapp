module.exports = (dbInstance, Sequelize) => {
    const Todo = dbInstance.define('todo', {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        completed: {
            type: Sequelize.BOOLEAN
        }
    }, {
        timestamps: false,
    });

    return Todo;
};
