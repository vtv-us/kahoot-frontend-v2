import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";

function AlertPresent({ name = "Tile", link = "/slides/owned" }) {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert
        action={
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="my-auto p-1 bg-gray-200 hover:opacity-50 rounded-md"
          >
            Join now
          </a>
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
