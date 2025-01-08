// Add to existing database initialization
    await db.exec(`
      CREATE TABLE IF NOT EXISTS ai_configurations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        voice TEXT NOT NULL,
        greeting TEXT NOT NULL,
        menu TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS calls (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        call_sid TEXT NOT NULL,
        voice TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
      );
    `);
