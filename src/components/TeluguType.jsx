import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';

const TeluguType = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = async (e) => {
    if (e.key === ' ' && inputValue.trim() !== '') {
      try {
        const response = await axios.get(
          `https://inputtools.google.com/request?text=${inputValue}&itc=te-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`
        );
        const firstTeluguWord =
          response.data[1][0][1].length > 0 ? response.data[1][0][1][0] : '';
        setInputValue(firstTeluguWord+" ");
      } catch (error) {
        console.error('Error fetching Telugu word:', error);
      }
    }
  };

  return (
    <div>
      <TextField
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default TeluguType;
