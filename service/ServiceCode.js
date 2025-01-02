import { useState } from "react";
import * as SQLite from "expo-sqlite";

var db;

const ServiceCode = () => {
  const initDb = async () => {
    db = await SQLite.openDatabaseAsync("PresetDb.db");
    await CreateTabels(); // Pass the database directly
  };

  const CreateTabels = async () => {
    await db.execAsync(` PRAGMA journal_mode = WAL; 
        CREATE TABLE IF NOT EXISTS Presets (Id INTEGER PRIMARY KEY AUTOINCREMENT,Name TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS Persons (Id INTEGER PRIMARY KEY AUTOINCREMENT,Preset INTEGER NOT NULL,Name TEXT NOT NULL,
        PhoneNumber TEXT NOT NULL,FOREIGN KEY (Preset) REFERENCES Presets (Id) ON DELETE CASCADE ON UPDATE CASCADE);`);
  };

  const CreatePreset = async (persons, presetName) => {
    if (!presetName || !presetName.trim()) {
      console.error("Preset name is required and cannot be empty.");
      return; // Exit if presetName is not valid
    }

    try {
      const result = await db.runAsync(
        'INSERT INTO Presets (Name) VALUES ("?")',
        [presetName]
      );

      let presetId = result.lastInsertRowId;
      // Insert into Persons table
      for (const person of persons) {
        await db.execAsync(
          'INSERT INTO Persons (Preset, Name, PhoneNumber) VALUES ("?", "?", "?");',
          [presetId, person.name, person.number]
        );
      }
      console.log("Preset and persons inserted successfully");
    } catch (error) {
      console.error("Error creating preset and inserting persons:", error);
    }
  };

  return {
    initDb,
    CreateTabels,
    CreatePreset,
  };
};

export default ServiceCode;
