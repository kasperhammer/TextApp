import { use, useEffect, useState } from "react";
import { Keyboard } from "react-native";

const Code = (onClose, preset) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState([]);
  const [selectAll, setSelecAll] = useState(true);
  const [allArr, setAllArr] = useState([]); // Use useState for allArr
  const [error, setError] = useState(false);


  const handlePress = (index) => {
    setSelectedItemIndex((prevSelected) => {
      // Check if index is already in the array
      if (prevSelected.includes(index)) {
        // Remove index from the array

        if (selectAll) {
          setSelecAll(false);
        }
        return prevSelected.filter((item) => item !== index);
      } else {
        setError(false);
        // Add index to the array
        return [...prevSelected, index];
      }
    });
  };

  const onSelectAll = () => {
    if (!selectAll) {
      setSelectedItemIndex(allArr);
    } else {
      setSelectedItemIndex([]);
      setSelecAll(false);
    }
  };

  useEffect(() => {
    if (selectedItemIndex.length == allArr.length) {
      setSelecAll(true);
      setError(false);
    }
  }, [selectedItemIndex]);

  const handleBackdropPress = (event) => {
    if (event.target === event.currentTarget) {
      onClose(null);
    }
  };

  const selectionComple = () => {
    let people = [];
    if (selectedItemIndex.length != 0) {
      for (let index = 0; index < selectedItemIndex.length; index++) {
        people.push(preset.People[selectedItemIndex[index]]);
      }
      people.sort((a, b) => a.Id - b.Id); // Compare 'Id' values
      if (people.length != allArr.length) {
        preset.People = people;
        onClose(preset);
      } else {
        onClose(null);
      }
    } else {
      setError(true);
    }
  };


  useEffect(() => {
    if (selectAll) {
      const arr = [...Array(preset.People.length).keys()];
      setSelectedItemIndex(arr);
      setAllArr(arr);
    }
  }, []);

  return {
    handleBackdropPress,
    handlePress,
    selectedItemIndex,
    selectAll,
    setSelecAll,
    onSelectAll,
    selectionComple,
    error,
  };
};

export default Code;
