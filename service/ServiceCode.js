import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";


var db;
const ServiceCode = () => {
  const initDb = async () => {
    db = await SQLite.openDatabaseAsync("PresetDb.db");
    await CreateTabels(); // Pass the db instance directly

  };
  
  const CreateTabels = async () => {
    await AwaitDb();
    await db.execAsync(`PRAGMA journal_mode = WAL; 
        CREATE TABLE IF NOT EXISTS Presets (Id INTEGER PRIMARY KEY AUTOINCREMENT,Name TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS Persons (Id INTEGER PRIMARY KEY AUTOINCREMENT,Preset INTEGER NOT NULL,Name TEXT NOT NULL,
        PhoneNumber TEXT NOT NULL,FOREIGN KEY (Preset) REFERENCES Presets (Id) ON DELETE CASCADE ON UPDATE CASCADE);`);
  };

  const CreatePreset = async (persons, presetName) => {
    await AwaitDb();
    if (!presetName || !presetName.trim()) {
      console.error("Preset name is required and cannot be empty.");
      return; // Exit if presetName is not valid
    }
  
    try {
      const result = await db.runAsync(
        'INSERT INTO Presets (Name) VALUES (?)',
        [presetName]
      );
  
      let presetId = result.lastInsertRowId;
      // Insert into Persons table
      for (const person of persons) {
        const text = "INSERT INTO Persons (Preset, Name, PhoneNumber) VALUES (?, ?, ?)";
        console.log(`Inserting Person: Preset=${presetId}, Name=${person.name}, PhoneNumber=${person.number}`);
        await db.runAsync(text, [presetId, person.name, person.number]);
      }
      console.log("Preset and persons inserted successfully");
    } catch (error) {
      console.error("Error creating preset and inserting persons:", error);
    }
  };
  

  const GetPresets = async () => {
    await AwaitDb();
    let allRows = await db.getAllAsync("SELECT * FROM Presets");
    return allRows;
  };

  const GetPeopleFromPreset = async (presetId) => {
    await AwaitDb();
    let persons = await db.getAllAsync("SELECT * FROM Persons WHERE Preset = (?)",[presetId]);  
    return persons;
  }

  const AwaitDb = async () => {
    console.log(db);
    while(db == undefined){
      await new Promise(r => setTimeout(r, 100));
    }
    return;
  };
   
  const ClearDb = async () => {
    await AwaitDb();
    console.log("Clear !§");
    await db.execAsync("Delete From Presets");
    await db.execAsync("Delete From Persons");

  };


  
  return {
    initDb,
    CreateTabels,
    CreatePreset,
    GetPresets,
    GetPeopleFromPreset,
  };
};

export default ServiceCode;