const Database =  require('./config')

const initDb = {

    async init() {

        const db = await Database()
    // await serve para que o javascript espere terminar uma execução e depois vá pra outra
    // asyncfala que tudo que está dentro tem que esperar
        await db.exec(`
            CREATE TABLE profile(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                avatar TEXT,
                monthly_budget INT,
                days_per_week INT,
                hours_per_day INT,
                vacation_per_year INT,
                value_hour INT
            );`)

        await db.exec(`
            CREATE TABLE jobs(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                daily_hours INT,
                total_hours INT,
                created_at DATETIME
            );`)

        await db.run(`INSERT INTO 
            profile (name, 
                    avatar, 
                    monthly_budget, 
                    days_per_week, 
                    hours_per_day, 
                    vacation_per_year,
                    value_hour) 
            VALUES("Misael", 
                    "https://avatars.githubusercontent.com/u/66078558?v=4", 
                    4500,
                    6,
                    6,
                    4,
                    95);`)

        await db.run(`INSERT INTO 
            jobs (name, 
                daily_hours, 
                total_hours,
                created_at) 
            VALUES("Pizzaria Guloso", 
                    2,
                    1, 
                    1617514376018);`)

        await db.run(`INSERT INTO 
            jobs (name, 
                daily_hours, 
                total_hours,
                created_at) 
            VALUES("OneTwo Project", 
                    3,
                    47, 
                    1617514376018);`)


        await db.close()
    }
}

initDb.init()