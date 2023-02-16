const data = {
  labels: labels,
  datasets: [
    {
      label: false,
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "#82E460",
      tension: 0.4,
    },
    {
      label: "My First Dataset",
      data: [55, 81, 60, 56, 65, 59, 65],
      fill: false,
      borderColor: "#FF577F",
      tension: 0.4,
    },
    {
      label: "My First Dataset",
      data: [39, 81, 34, 56, 61, 59, 28],
      fill: false,
      borderColor: "#00B8FF",
      tension: 0.4,
    },
  ],
};
//CHART JS
// const labels = Utils.months({count: 7});
//Will need to remove tooltips
//Will need to edit font
const config = {
  type: "line",
  data: data,
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
  },
};
