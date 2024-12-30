import { useState, useEffect } from "react";
import * as SQLite from 'expo-sqlite';

const ServiceCode = () => {
    const [db, setDb] = useState(null);

    const initDb = async () => {
        console.log("init");
        setDb(await SQLite.openDatabaseAsync('testDb.db'));
        console.log("init completed");
    };

    useEffect(() => {
        initDb(); // Run once on mount
    }, []); // Empty dependency array ensures it runs only once

    const CreateTabels = async() => {
        console.log("Create Tabels");
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
            INSERT INTO test (value, intValue) VALUES ('test1', 123);
            INSERT INTO test (value, intValue) VALUES ('test2', 456);
            INSERT INTO test (value, intValue) VALUES ('test3', 789);
            `);
            console.log("Tabels Created");
    };


    return {
       CreateTabels
    };
};

export default ServiceCode;

