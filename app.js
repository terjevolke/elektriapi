const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const labels = [];
const priceData = [];
const productionData = {};
const consumptionData = {};
const solarEnergyProductionData = {};
const dayNightData = [];
const monthly = {};
const start = new Date(y - 1, m, 1).toISOString();
const end = new Date(y, m, 0).toISOString();

/*
fetch(`https://dashboard.elering.ee/api/nps/price?start=${start}&end=${end}`)
  .then((response) => response.json())
  .then((res) => {
    res.data.ee.forEach((el) => {
      //console.log(res);
      const date = new Date(el.timestamp * 1000);
      const options = {
        year: "numeric",
        month: "short",
        day: "2-digit",
      };
      const localDate = date.toLocaleString("et-EE", options);
      //console.log(localDate, el.price);
      labels.push(localDate);
      priceData.push(el.price);
    });
    //console.log(labels);
    //console.log(priceData);

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Hind",
          backgroundColor: "rgb(88, 156, 64)",
          borderColor: "rgb(88, 156, 64)",
          data: priceData,
        },
      ],
    };

    const config = {
      type: "bar",
      data: data,
      options: {},
    };

    const myChart = new Chart(document.getElementById("myChart"), config);
  });
*/

fetch(`https://dashboard.elering.ee/api/system/with-plan?start=${start}&end=${end}`)
  .then((response) => response.json())
  .then((res) => {
    res.data.real.forEach( el => {
      const date = new Date(el.timestamp * 1000);
      const dateKey = date.toJSON().slice(0, 10);

      if ( !(dateKey in productionData) ) {
        productionData[dateKey] = el.production;
        consumptionData[dateKey] = el.consumption;
        solarEnergyProductionData[dateKey] = el.solar_energy_production;
      } else {
        productionData[dateKey] += el.production;
        consumptionData[dateKey] += el.consumption;
        solarEnergyProductionData[dateKey] += el.solar_energy_production;
      }

    });

    const data = {
      datasets: [
        {
          label: "Tootmine",
          backgroundColor: "rgb(88, 156, 64)",
          borderColor: "rgb(88, 156, 64)",
          data: productionData,
        },
        {
          label: "Päike",
          backgroundColor: "rgb(235, 152, 52)",
          borderColor: "rgb(235, 152, 52)",
          data: solarEnergyProductionData,
        },
        {
          label: "Tarbimine",
          backgroundColor: "rgb(156, 64, 70)",
          borderColor: "rgb(156, 64, 70)",
          data: consumptionData,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {},
    };

    const myChart1 = new Chart(document.getElementById("myChart1"), config);
  });

//const start = new Date(y - 1, m, 1).toISOString();
//const end = new Date(y - 1, m, 2).toISOString();
//console.log(start);
//console.log(end);
/* 
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
          label: "Tarbimine kWh",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: monthly,
        },
      ],
    };

    const config = {
      type: "bar",
      data: data,
      options: {},
    };

    const myChart2 = new Chart(document.getElementById("myChart2"), config);
  });
*/
