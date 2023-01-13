module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user',
    password: 'passwrd',
    database: 'event-hub',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cli: {
        migrationDir: 'src/migrations',
    },
};