const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const labels = [];
const dayNightData = [];
const monthly = {};

//const start = new Date(y - 1, m, 1).toISOString();
//const end = new Date(y - 1, m, 2).toISOString();
//console.log(start);
//console.log(end);

fetch(`https://api.ta20truu.itmajakas.ee/api/energia`)
  .then((response) => response.json())
  .then((res) => {
    res.forEach((el) => {
      //console.log(res);
      const date = new Date(el.timestamp * 1000);
      const options = {
        //year: "numeric",
        month: "long",
        day: "2-digit",
        //hour: "2-digit",
        //minute: "2-digit",
        //second: "2-digit",
      };
      const localDate = date.toLocaleString("et-EE", options);
      const monthKey = el.startDate.substring(0, 7);
      //console.log(localDate, el.dayNight);
      labels.push(monthKey);
      dayNightData.push(el.dayNight);
      if (monthly.hasOwnProperty(monthKey)) {
        monthly[monthKey] += el.dayNight;
      } else {
        monthly[monthKey] = el.dayNight;
      }

      //console.log(monthKey);
    });
    //console.log(labels);
    //console.log(dayNightData);
    //console.log(monthly);
    // esiteks vaja saada startdate stringist kätte aasta ja kuu, need jagada dictionarysse (aasta ja kuu on key), selle järgi liita kokku

    const data = {
      labels: Object.keys(monthly),
      datasets: [
        {
          label: "Tarbimine",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: monthly,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {},
    };

    const myChart = new Chart(document.getElementById("myChart"), config);
  });
