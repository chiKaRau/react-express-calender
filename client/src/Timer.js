import React, { Component } from "react";
import { showMonthName, showWeekDayName } from "./TimeName.js";

const Timer = props => {
  return (
    <div className="timertext">
      <h1>
        {showMonthName(props.cMonth)} {props.cDay} {props.cYear}{" "}
        {showWeekDayName(props.cWeekDay)}{" "}
        {props.cHour < 10 ? "0" + props.cHour : props.cHour}:
        {props.cMinute < 10
          ? "0" + props.cMinute
          : props.cMinute}
        :
        {props.cSecond < 10
          ? "0" + props.cSecond
          : props.cSecond}
      </h1>
    </div>
  );
};

export default Timer;
