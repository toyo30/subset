import { MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import { useEffect, useState } from "react";
import { bar_pins, pins } from "../../constant/pins";

interface Props {
  label?: string;
  selectOptions: string[];
  onChange?: (event: SelectChangeEvent) => void;
  setSelectGroup?: (groupName: string) => void;
  defaultValue?: string;
}

export const BasicSelect: React.FC<Props> = ({
  label,
  selectOptions,
  onChange,
  setSelectGroup,
  defaultValue,
}) => {
  const [selectValue, setSelectValue] = useState("");
  const result = { ...pins, ...bar_pins };

  const handleChange = (event: SelectChangeEvent) => {
    onChange?.(event);
    setSelectValue(event.target.value as string);
    setSelectGroup?.(event.target.value as string);
    // setSelectGroup(event.target.value as string);
  };

  useEffect(() => {
    if (selectOptions.length > 0) {
      setSelectValue(defaultValue || "");
      // setSelectGroup(selectOptions[0]);
    }
  }, [selectOptions]);

  return (
    <Box sx={{ minWidth: 280 }}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 280 }}>
        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectValue}
          onChange={handleChange}
          label={label}
          defaultValue={defaultValue}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: "200px", // 여기에 원하는 높이를 설정합니다.
              },
            },
          }}
        >
          {selectOptions.length > 0 ? (
            selectOptions.map((item, idx) => (
              <MenuItem key={idx} value={item}>
                {result[item].name}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="">없음</MenuItem>
          )}
        </Select>
        {/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
          집합
        </InputLabel>
        <NativeSelect
          value={selectValue}
          // onChange={handleChange}
          defaultValue={selectOptions[0]}
          inputProps={{
            name: "집합",
            id: "uncontrolled-native",
          }}
        >
          {selectOptions.length > 0 ? (
            selectOptions.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))
          ) : (
            <option value="">없음</option>
          )}
        </NativeSelect> */}
      </FormControl>
    </Box>
  );
};

// BasicSelect.defaultProps = {
//   label: "집합",
//   selectOptions: ["NEXT", "아우르", "17동기", "개구리"],
//   // selectObject: {
//   //   NEXT: "NEXT",
//   //   아우르: "아우르",
//   //   "17동기": "17동기",
//   //   개구리: "개구리",
//   // },
// };
