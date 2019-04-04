import React, { Component } from "react";
import $ from "jquery";
import "./styles.css";
import monthdata from "./monthdata.js";
import {
  showMonthName,
  showWeekDayName,
  showWeekDayFullName
} from "./TimeName.js";
import Timer from "./Timer.js";
import DayBox from "./DayBox.js";
import weekday from "./weekday.js";
//callback life

//more function: allow user to put note (need db)
//clicking month would go to month option
//clicking year would go to year option

class Calander extends Component {
  state = {
    cDay: "",
    cWeekDay: "",
    cMonth: "",
    cYear: "",
    cHour: "",
    cMinute: "",
    cSecond: "",
    displayCurrent: true,
    displayPreview: false,
    pMonth: new Date().getMonth() + 1,
    pYear: new Date().getFullYear(),
    pMonthdata: ""
  };

  componentDidMount = () => {
    this.interval = setInterval(this.initTime, 1000);
  };

  initTime = () => {
    let now = new Date();
    this.setState(
      {
        cDay: now.getDate(),
        cWeekDay: now.getDay(),
        cMonth: now.getMonth() + 1,
        cYear: now.getFullYear(),
        cHour: now.getHours(),
        cMinute: now.getMinutes(),
        cSecond: now.getSeconds()
      },
      () => this.checkLeapYear(this.state.cYear)
    );
  };

  checkLeapYear = year => {
    this.leapYear(year) ? (monthdata[1].days = 29) : (monthdata[1].days = 28);
  };

  leapYear = year => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  prev = () => {
    let temp;
    if (this.leapYear(this.state.pYear)) {
      temp = monthdata;
      temp[1].days = 29;
      this.setState(
        {
          pMonthdata: temp
        },
        this.exceed1()
      );
    } else {
      temp = monthdata;
      temp[1].days = 28;
      this.setState(
        {
          pMonthdata: temp
        },
        this.exceed1()
      );
    }
  };

  exceed1 = () => {
    if (this.state.pMonth === 1) {
      this.setState(
        {
          pMonth: 13,
          pYear: this.state.pYear - 1
        },
        () => this.subtract()
      );
    } else {
      this.subtract();
    }
  };

  next = () => {
    let temp;
    if (this.leapYear(this.state.pYear)) {
      temp = monthdata;
      temp[1].days = 29;
      this.setState(
        {
          pMonthdata: temp
        },
        this.exceed12()
      );
    } else {
      temp = monthdata;
      temp[1].days = 28;
      this.setState(
        {
          pMonthdata: temp
        },
        this.exceed12()
      );
    }
  };

  exceed12 = () => {
    if (this.state.pMonth === 12) {
      this.setState(
        {
          pMonth: 0,
          pYear: this.state.pYear + 1
        },
        () => this.add()
      );
    } else {
      this.add();
    }
  };

  subtract = () => {
    this.setState(
      {
        pMonth: this.state.pMonth - 1
      },
      () => this.checkCurrentYear()
    );
  };

  add = () => {
    this.setState(
      {
        pMonth: this.state.pMonth + 1
      },
      () => this.checkCurrentYear()
    );
  };

  checkCurrentYear = () => {
    this.state.pMonth === this.state.cMonth &&
    this.state.pYear === this.state.cYear
      ? this.setState({
          displayCurrent: true,
          displayPreview: false
        })
      : this.setState({
          displayCurrent: false,
          displayPreview: true
        });
  };

  checkWeekday = (year, month) => {
    let day = 1;
    let n = new Date(year, month - 1, day);
    let weekdayName = showWeekDayFullName(n.getDay());
    let temp = "",
      weekDayNameTemp = "";
    weekday.map(ele => {
      temp = ele[0];
      if (temp === weekdayName) {
        weekDayNameTemp = ele;
      }
    });
    return weekDayNameTemp;
  };

  displayDay = () => {
    let boxes = [],
      cMonth;
    Object.values(monthdata).map(month => {
      this.state.cMonth === month.id && (cMonth = month.days);
    });
    boxes.push(
      <div className="monthBox">
        <h2 className="inlinebox">
          <span onClick={this.prev}>
            &nbsp; <i class="fas fa-chevron-left" /> &nbsp;
          </span>
        </h2>
        <h1 className="inlinebox">{this.state.cMonth}</h1>
        <h2 className="inlinebox">
          <span onClick={this.next}>
            &nbsp; <i class="fas fa-chevron-right" /> &nbsp;
          </span>
        </h2>
        <h1 className="floatRight">{this.state.cYear}&nbsp;</h1>
      </div>
    );

    let temp = this.checkWeekday(this.state.cYear, this.state.cMonth);
    for (let ele of temp) {
      boxes.push(<div className="weekDayBox">{ele}</div>);
    }

    for (let i = 0; i < cMonth; i++) {
      if (this.state.cDay === i + 1) {
        boxes.push(
          <DayBox
            dayBox={"dayBox"}
            highlightedDate={"highlightedDate"}
            date={i + 1}
          />
        );
      } else {
        boxes.push(<DayBox dayBox={"dayBox"} date={i + 1} />);
      }
    }
    return boxes;
  };

  displayPreviewMonth = () => {
    let boxes = [],
      pMonth;
    Object.values(this.state.pMonthdata).map(month => {
      this.state.pMonth === month.id && (pMonth = month.days);
    });
    boxes.push(
      <div className="monthBox">
        <h2 className="inlinebox">
          <span onClick={this.prev}>
            &nbsp; <i class="fas fa-chevron-left" /> &nbsp;
          </span>
        </h2>
        <h1 className="inlinebox">{this.state.pMonth}</h1>
        <h2 className="inlinebox">
          <span onClick={this.next}>
            &nbsp; <i class="fas fa-chevron-right" /> &nbsp;
          </span>
        </h2>
        <h1 className="floatRight">{this.state.pYear}&nbsp;</h1>
      </div>
    );
    let temp = this.checkWeekday(this.state.pYear, this.state.pMonth);
    for (let ele of temp) {
      boxes.push(<div className="weekDayBox">{ele}</div>);
    }
    for (let i = 0; i < pMonth; i++) {
      boxes.push(<DayBox dayBox={"dayBox"} date={i + 1} />);
    }
    return boxes;
  };

  render() {
    let displayCurrent = this.displayDay();
    let displayPreview = this.displayPreviewMonth();
    this.checkWeekday();
    return (
      <div className="center">
        <div className="sizedBox">
          <Timer
            cDay={this.state.cDay}
            cWeekDay={this.state.cWeekDay}
            cMonth={this.state.cMonth}
            cYear={this.state.cYear}
            cHour={this.state.cHour}
            cMinute={this.state.cMinute}
            cSecond={this.state.cSecond}
          />
          {this.state.displayCurrent && displayCurrent}
          {this.state.displayPreview && displayPreview}
        </div>
      </div>
    );
  }
}

export default Calander;
