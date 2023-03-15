import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ searchTerm, handleSearchChange }) => {
  return (
    <TextField
      label="Search Products"
      placeholder="חפש מוצר..."
      value={searchTerm}
      onChange={handleSearchChange}
      fullWidth
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;