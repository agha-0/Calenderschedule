import React, { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import DatePicker from "react-datepicker";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";

//css
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2023, 0, 2),
    end: new Date(2023, 0, 5),
  },
  {
    title: "Vacation",
    start: new Date(2023, 0, 7),
    end: new Date(2023, 0, 10),
  },
  {
    title: "Conference",
    start: new Date(2023, 0, 20),
    end: new Date(2023, 0, 23),
  },
];

function ScheduleCalender() {
  // usestates
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    employee: "",
  });
  const [allEvents, setAllEvents] = useState(events);
  const [open, setOpen] = useState(false);

  // functions
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);

      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("added");
        break;
      }
    }

    setAllEvents([...allEvents, newEvent]);
  }
  return (
    <Container maxWidth="lg">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h1>Calendar</h1>
        <div>
          <Button
            variant="contained"
            style={{
              backgroundColor: "black",
              height: "40px",
              marginTop: "30px",
            }}
            onClick={handleOpen}
          >
            Add New Appointment
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <TextField
                type={"text"}
                required
                id="outlined-required"
                label="Title"
                defaultValue=""
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                style={{ width: "100%" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: "10px",
                }}
              >
                <div>
                  <DatePicker
                    placeholderText="Start Date"
                    selected={newEvent.start}
                    onChange={(start) => setNewEvent({ ...newEvent, start })}
                  />
                </div>
                <div>
                  <DatePicker
                    placeholderText="End Date"
                    selected={newEvent.end}
                    onChange={(end) => setNewEvent({ ...newEvent, end })}
                  />
                </div>
              </div>
              <div>
                <Button
                  onClick={handleClose}
                  style={{
                    backgroundColor: "black",
                    height: "40px",
                    marginTop: "30px",
                    float: "right",
                    color: " white",
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  onClick={handleAddEvent}
                  style={{
                    backgroundColor: "black",
                    height: "40px",
                    marginTop: "30px",
                    float: "left",
                  }}
                >
                  Add Event
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </Container>
  );
}

export default ScheduleCalender;
