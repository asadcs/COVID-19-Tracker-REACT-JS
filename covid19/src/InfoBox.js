import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

function InfoBox({ title, cases, total, active, isRed, ...props }) {
  console.log(cases);
  return (
    <div>
      <Card>
        <CardContent>
          <Typography color="textSecondary" className="infoBox__title">
            {title}
          </Typography>
          <h2 className="infoBox__cases">{cases}</h2>
          <Typography color="textSecondary" className="infoBox__total">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
