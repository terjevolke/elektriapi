const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const labels = [];
const priceData = [];
const productionData = [];
const consumptionData = [];
const solar_energy_productionData = [];
const start = new Date(y, m, 0).toISOString();
const end = new Date(y, m, 1).toISOString();
//console.log(start);
//console.log(end);

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
                //  hour: "2-digit",
                //  second: "2-digit",
            };
            const localDate = date.toLocaleString("et-EE", options);
            //console.log(localDate, el.price);
            labels.push(localDate);
            priceData.push(el.price);
        });
        console.log(labels);
        console.log(priceData);

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

fetch(`https://dashboard.elering.ee/api/system/with-plan?start=${start}&end=${end}`)

    .then((response) => response.json())
    .then((res) => {
        console.log(res);
        res.data.real.forEach((el) => {

          const date = new Date(el.timestamp * 1000);
            const options = {
                year: "numeric",
                month: "short",
                day: "2-digit",
               hour: "2-digit",
                //    second: "2-digit",
            };
            const localDate = date.toLocaleString("et-EE", options);
            console.log(localDate, el.production);
            labels.push(localDate);
            productionData.push(el.production);
            consumptionData.push(el.consumption);
            solar_energy_productionData.push(el.solar_energy_production);
        });
        console.log(labels);

        console.log(productionData);
        console.log(consumptionData);
        console.log(solar_energy_productionData);


        const data = {
            labels: labels,
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
                     data: solar_energy_productionData,
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
