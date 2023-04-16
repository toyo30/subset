import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";

interface Props {
  label?: string;
  selectOptions?: string[];
  onChange?: (event: SelectChangeEvent) => void;
}

export const BasicSelect: React.FC<Props> = ({
  label,
  selectOptions,
  onChange,
}) => {
  const [selectValue, setSelectValue] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    onChange?.(event);
    setSelectValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 280 }}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 280 }}>
        <InputLabel id="demo-simple-select-standard-label">집합</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectValue}
          onChange={handleChange}
          label={label}
          defaultValue={selectOptions && selectOptions[0]}
        >
          {selectOptions && selectOptions.length > 0 ? (
            selectOptions.map((item, idx) => (
              <MenuItem key={idx} value={item}>
                {item}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="">없음</MenuItem>
          )}

          {/* <MenuItem value="">NEXT</MenuItem>
          <MenuItem value={10}>아우르</MenuItem>
          <MenuItem value={20}>17동기</MenuItem>
          <MenuItem value={30}>개구리</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
};

BasicSelect.defaultProps = {
  label: "집합",
  selectOptions: ["NEXT", "아우르", "17동기", "개구리"],
  // selectObject: {
  //   NEXT: "NEXT",
  //   아우르: "아우르",
  //   "17동기": "17동기",
  //   개구리: "개구리",
  // },
};
