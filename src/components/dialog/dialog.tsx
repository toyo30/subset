import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Dayjs } from "dayjs";
import * as React from "react";
import { useContext, useState } from "react";
import { firebaseApi } from "../../api/firebase-api";
import MyContext from "../../contexts/MyContext";
import {
  convertDayjsTostamp,
  convertTimeTostampToDayjs,
} from "../../utils/time/timeFormat";
import { DateAndTimePicker } from "../dateAndTimePicker/DateAndTimePicker";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface Props {
  eventDocument: any;
}

export const CustomizedDialogs: React.FC<Props> = ({ eventDocument }) => {
  const { userInstance } = useContext(MyContext);
  const [open, setOpen] = React.useState(false);
  const [eventTimeStart, setEventTimeStart] = useState<Dayjs | null>(
    convertTimeTostampToDayjs(eventDocument.timeToStart)
  );
  const [eventTimeEnd, setEventTimeEnd] = useState<Dayjs | null>(
    convertTimeTostampToDayjs(eventDocument.timeToEnd)
  );

  console.log(eventDocument, "eventDocument");
  console.log(
    convertTimeTostampToDayjs(eventDocument.timeToEnd),
    "convertTimeTostampToDayjs"
  );
  const updateEvnet = async () => {
    const newAttendance = [
      ...eventDocument.attendance,
      {
        name: userInstance.name,
        timeToStart: eventTimeStart && convertDayjsTostamp(eventTimeStart),
        timeToEnd: eventTimeEnd && convertDayjsTostamp(eventTimeEnd),
      },
    ];

    const sortedAttendance = newAttendance.sort((a: any, b: any) => {
      if (a.timeToEnd && b.timeToEnd) {
        if (
          convertTimeTostampToDayjs(a.timeToEnd).isBefore(
            convertTimeTostampToDayjs(b.timeToEnd)
          )
        ) {
          return -1;
        } else if (
          convertTimeTostampToDayjs(a.timeToEnd).isAfter(
            convertTimeTostampToDayjs(b.timeToEnd)
          )
        ) {
          return 1;
        } else {
          return 0;
        }
      } else if (!a.timeToEnd && !b.timeToEnd) {
        // a와 b의 모두 timeToEnd가 없는 경우, 순서를 변경하지 않습니다.
        return 0;
      } else if (!a.timeToEnd) {
        // a에만 timeToEnd가 없는 경우, a가 b보다 작다고 판단합니다.
        return -1;
      } else {
        // b에만 timeToEnd가 없는 경우, b가 a보다 작다고 판단합니다.
        return 1;
      }
    });

    const payload = {
      attendance: sortedAttendance,
      timeToStart: eventTimeStart?.isAfter(
        convertTimeTostampToDayjs(eventDocument.timeToStart)
      )
        ? convertDayjsTostamp(eventTimeStart)
        : eventDocument.timeToStart,
      timeToEnd: eventTimeEnd?.isAfter(
        convertTimeTostampToDayjs(eventDocument.timeToEnd)
      )
        ? convertDayjsTostamp(eventTimeEnd)
        : eventDocument.timeToEnd,
    };

    // const payload = {
    //   attendance: sortedAttendance,
    //   timeToStart: eventTimeStart?.isAfter(
    //     convertTimeTostampToDayjs(eventDocument.TimeToStart)
    //   )
    //     ? convertDayjsTostamp(eventTimeStart)
    //     : eventDocument.TimeToStart,
    //   timeToEnd: eventTimeEnd?.isAfter(eventDocument.TimeToEnd)
    //     ? convertDayjsTostamp(eventTimeEnd)
    //     : eventDocument.TimeToEnd,
    // };

    try {
      const response = await firebaseApi.updateData(
        eventDocument.id,
        "Events",
        payload
      );
      alert("참여 완료!");
    } catch (error) {
      alert("참여 에러");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    updateEvnet();
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        참여하기
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {eventDocument.group}
          {"-"}
          {eventDocument.title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>참여가능한 시간을 입력해주세요</Typography>
          <Typography>
            <DateAndTimePicker
              onChange={(e: Dayjs | null) => setEventTimeStart(e)}
              defaultDay={convertTimeTostampToDayjs(eventDocument.timeToStart)}
            />
          </Typography>
          <Typography>
            <DateAndTimePicker
              onChange={(e: Dayjs | null) => setEventTimeEnd(e)}
              defaultDay={convertTimeTostampToDayjs(eventDocument.timeToEnd)}
            />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            참여하기
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};
