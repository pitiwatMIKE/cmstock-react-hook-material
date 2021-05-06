import React from "react";
import {makeStyles, Paper } from "@material-ui/core";
import { Line, Bar, Pie } from "react-chartjs-2";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Button, ButtonGroup, IconButton } from "@material-ui/core";

export default function Report() {
  const [chartType, setChartType] = React.useState("bar");
  const [chartData1, setChartData1] = React.useState([]);
  const [chartData2, setChartData2] = React.useState([]);

  const getRandomInt = () => {
    let randoms = [];
    for (let index = 0; index < 8; index++) {
      randoms.push(Math.floor(Math.random() * (50000 - 5 + 1)) + 5);
    }
    return randoms;
  };

  React.useEffect(() => {
    setChartData1(getRandomInt());
    setChartData2(getRandomInt());
  }, []);

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Revenue 2017",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(75,92,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,92,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,92,192,1)",
        pointHoverBorderColor: "rgba(120,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chartData1,
      },
      {
        label: "Revenue 2018",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chartData2,
      },
    ],
  };

  const chartOption = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
          },
        },
      ],
    },
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      padding: 30,
    },
  }));

  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={10}>
      <h1>Report</h1>

      <ButtonGroup
        size="large"
        color="primary"
        aria-label="large outlined primary button group"
      >
        <Button
          variant={chartType === "line" ? "contained" : "outlined"}
          onClick={() => setChartType("line")}
        >
          Line
        </Button>
        <Button
          variant={chartType === "bar" ? "contained" : "outlined"}
          onClick={() => setChartType("bar")}
        >
          Bar
        </Button>
        <Button
          variant={chartType === "pie" ? "contained" : "outlined"}
          onClick={() => setChartType("pie")}
        >
          Pie
        </Button>
      </ButtonGroup>
      <IconButton
        aria-label="refresh"
        onClick={() => {
          setChartData1(getRandomInt());
          setChartData2(getRandomInt());
        }}
      >
        <RefreshIcon />
      </IconButton>
      <div style={{ height: 420 }}>
        {chartType === "line" && (
          <Line data={data} width={100} height={50} options={chartOption} />
        )}
        {chartType === "pie" && (
          <Pie data={data} width={100} height={50} options={chartOption} />
        )}
        {chartType === "bar" && (
          <Bar data={data} width={100} height={50} options={chartOption} />
        )}
      </div>
    </Paper>
  );
}
