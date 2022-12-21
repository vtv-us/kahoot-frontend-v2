import React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

function AlertPresent({ name = "Tile", link = "/slides" }) {
  const navigate = useNavigate();
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert
        action={
          <Button color="inherit" size="small" onClick={() => navigate(link)}>
            Join now
          </Button>
        }
      >
        <div className="text-green-600">
          The presentation about <strong>{name}</strong> is happening - Join now
        </div>
      </Alert>
    </Stack>
  );
}

AlertPresent.propTypes = { name: PropTypes.string.isRequired, link: PropTypes.string.isRequired };

export default AlertPresent;
