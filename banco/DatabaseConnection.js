import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("./database.db")

export default db