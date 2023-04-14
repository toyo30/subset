import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export const BasicCard = () => {
  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          모각공
        </Typography>
        <Typography variant="h5" component="div">
          참여자
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          지우, 민기, 나영, 영서
        </Typography>
        <Typography variant="body2">
          13:00 ~ 15:00
          <br />
          14:00 ~ 17:00
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">참가하기</Button>
      </CardActions>
    </Card>
  );
};
