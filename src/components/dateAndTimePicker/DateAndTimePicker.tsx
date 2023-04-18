import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";

interface Props {
  onChange: (date: Dayjs | null) => void;
  defaultDay: Dayjs;
}

export const DateAndTimePicker: React.FC<Props> = ({ defaultDay, ...rest }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker {...rest} defaultValue={defaultDay} />
    </LocalizationProvider>
  );
};
