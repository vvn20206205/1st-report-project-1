
// Sequelize thư viện Ánh xạ quan hệ đối tượng (ORM)
const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);

// Đồng bộ hóa mô hình với cơ sở dữ liệu.
(async () => {
    try {
        await sequelize.sync();
        console.log('✅ Sequelize successfully.');
    } catch (error) {
        console.error('Sequelize error: ', error);
    }
})();

module.exports = sequelize;