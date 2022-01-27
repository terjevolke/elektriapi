const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const start = new Date(y, m, 0).toISOString();
const end = new Date(y, m + 1, 1).toISOString();
console.log(start);
console.log(end);

fetch(`https://dashboard.elering.ee/api/nps/price?start=${start}&end=${end}`)
  //fetch(`https://id.energia.ee/delegate/5g-api/v2/consumption?start-date=2021-01-01&end-date=2022-01-01&interval=HOUR&eic=38ZEE-00625607-9`)

  .then((response) => response.json())
  .then((res) => {
    res.data.ee.forEach((el) => {
      console.log(res);
      const date = new Date(el.timestamp * 1000);
      const options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        second: "2-digit",
      };
      const localDate = date.toLocaleString("et-EE", options);
      console.log(localDate, el.price);
    });
  });

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
    {
      label: "My First dataset",
      backgroundColor: "rgb(0, 0, 255)",
      borderColor: "rgb(0, 0, 255)",
      data: [0, 4, 10, 2, 25, 36, 50],
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {},
};

const myChart = new Chart(document.getElementById("myChart"), config);
