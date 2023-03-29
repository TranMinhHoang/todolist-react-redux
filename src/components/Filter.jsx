import {
  Autocomplete,
  Box,
  Chip,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByPriority, filterByStatus, filterByText } from "../redux/filterSlice";
import listPriority from "./listPriority";

function Filter() {
  const inputRef = useRef(null);
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleChangeSearchText = (e) => {
    dispatch(filterByText(e.target.value))
  }

  const handleChangeStatus = (e) => {
    dispatch(filterByStatus(e.target.value))
  }

  const handleChangePriority = (e, value) => {
    value.length
      ? (inputRef.current.placeholder = "")
      : (inputRef.current.placeholder = "Please select");
      dispatch(filterByPriority(value))
  }
  
  return (
    <Box sx={{ py: "20px", borderBottom: '1px solid #ededed' }}>
      <Stack spacing={1}>
        <div>
          <div className="mb-1 font-medium">Search</div>
          <TextField
            id="outlined-basic"
            placeholder="input search text"
            variant="outlined"
            sx={{ width: "100%" }}
            size="small"
            value={filter.searchText}
            onChange={handleChangeSearchText}
          />
        </div>
        <div>
          <div className="font-medium">Filter By Status</div>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={filter.status}
            onChange={handleChangeStatus}
          >
            <FormControlLabel
              value="All"
              control={<Radio size="small" sx={{ color: "#d9d9d9" }} />}
              label="All"
            />
            <FormControlLabel
              value="Completed"
              control={<Radio size="small" sx={{ color: "#d9d9d9" }} />}
              label="Completed"
            />
            <FormControlLabel
              value="To do"
              control={<Radio size="small" sx={{ color: "#d9d9d9" }} />}
              label="To do"
            />
          </RadioGroup>
        </div>
        <div>
          <div className="mb-1 font-medium">Filter By Priority</div>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={listPriority}
            getOptionLabel={(option) => option.title}
            freeSolo
            size="small"
            disableCloseOnSelect
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="filled"
                  label={option.title}
                  {...getTagProps({ index })}
                  size="small"
                  sx={{
                    borderColor: option?.borderColor,
                    border: '1px solid',
                    backgroundColor: option.backgroundColor,
                    color: option.color
                  }}
                />
              ))
            }
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  placeholder="Please select"
                  size="small"
                  inputRef={inputRef}
                />
              );
            }}
            // renderOption={(props, option, state) => {
            //     console.log(option)
            //   return (
            //     <div key={state.index} className="p-2 hover:bg-[#f5f5f5]">
            //       <div style={{
            //         color: option.color,
            //         backgroundColor: option.backgroundColor,
            //         borderColor: option.borderColor,
            //         border: '1px solid',
            //         padding: '0 10px',
            //         // width: 'fit-content',
            //         // fontSize: '12px'
            //       }}>{option.title}</div>
            //     </div>
            //   );
            // }}
            onChange={handleChangePriority}
          />
          
        </div>
      </Stack>
    </Box>
  );
}

export default Filter;
