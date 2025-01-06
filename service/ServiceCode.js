import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";

var db;
const ServiceCode = () => {

  async function initDb() {
    db = await SQLite.openDatabaseAsync("PresetDb.db");
    await CreateTabels(); // Pass the db instance directly
  }

  async function CreateTabels() {
    await AwaitDb();
    await db.execAsync(`PRAGMA journal_mode = WAL; 
        CREATE TABLE IF NOT EXISTS Presets (Id INTEGER PRIMARY KEY AUTOINCREMENT,Name TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS Persons (Id INTEGER PRIMARY KEY AUTOINCREMENT,Preset INTEGER NOT NULL,Name TEXT NOT NULL,
        PhoneNumber TEXT NOT NULL,FOREIGN KEY (Preset) REFERENCES Presets (Id) ON DELETE CASCADE ON UPDATE CASCADE);`);
  }

  async function CreatePreset(persons, presetName) {
    await AwaitDb();
    if (!presetName || !presetName.trim()) {
      console.error("Preset name is required and cannot be empty.");
      return; // Exit if presetName is not valid
    }

    try {
      const result = await db.runAsync(
        "INSERT INTO Presets (Name) VALUES (?)",
        [presetName]
      );

      let presetId = result.lastInsertRowId;
      // Insert into Persons table
      for (const person of persons) {
        const text =
          "INSERT INTO Persons (Preset, Name, PhoneNumber) VALUES (?, ?, ?)";
        console.log(
          `Inserting Person: Preset=${presetId}, Name=${person.name}, PhoneNumber=${person.number}`
        );
        await db.runAsync(text, [presetId, person.name, person.number]);
      }
      console.log("Preset and persons inserted successfully");
    } catch (error) {
      console.error("Error creating preset and inserting persons:", error);
    }
  }

  async function DeletePreset(presetId) {
    await AwaitDb();
    await db.runAsync("Delete FROM Persons WHERE Preset = $presetId", {
      $presetId: presetId,
    });
    await db.runAsync("Delete FROM Presets WHERE Id = $presetId", {
      $presetId: presetId,
    });
  }

  async function GetPresets() {
    await AwaitDb();
    let allRows = await db.getAllAsync("SELECT * FROM Presets");
    return allRows;
  }

  async function GetPeopleFromPreset(presetId) {
    await AwaitDb();
    let persons = await db.getAllAsync(
      "SELECT * FROM Persons WHERE Preset = (?)",
      [presetId]
    );
    return persons;
  }

  async function UpdatePreset (presetId,presetName) {
    await AwaitDb();
    await db.runAsync("Update Presets SET Name = $presetName WHERE Id = $presetId ",{$presetName:presetName,$presetId:presetId})
    return true;
  }

  async function UpdatePerson(person) {
    await AwaitDb();
   
    try{
      let res = await db.runAsync("Update Persons SET Name = $name, PhoneNumber = $number WHERE Id = $id ",{$name: person.Name, $number: person.Number,$id:person.Id})

      return true;
     
    }catch(e){
  
    }


    return false;
  }

  async function AddPerson(person,presetId) {
    await AwaitDb();
    await db.runAsync("INSERT INTO Persons (Name,PhoneNumber,Preset) VALUES ($name,$number,$preset)",{$name:person.Name,$number:person.Number,$preset:presetId});
    return true;
  }

async function DeletePerson(personId){
  await AwaitDb();
  await db.runAsync("DELETE FROM Persons WHERE Id = $personId",{$personId:personId});
  return true;
}

  async function AwaitDb() {
    while (db == undefined) {
      await new Promise((r) => setTimeout(r, 100));
    }
    return;
  }

  async function ClearDb() {
    await AwaitDb();
    console.log("Clear !§");
    await db.execAsync("Delete From Presets");
    await db.execAsync("Delete From Persons");
  }

  return {
    initDb,
    CreateTabels,
    CreatePreset,
    GetPresets,
    GetPeopleFromPreset,
    DeletePreset,
    UpdatePreset,
    UpdatePerson,
    AddPerson,
    DeletePerson,
  };
};

export default ServiceCode;
