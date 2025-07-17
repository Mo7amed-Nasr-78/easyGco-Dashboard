const salesChart = document.querySelector("#sales_chart").getContext("2d");
const customersChart = document
    .querySelector("#customers_chart")
    .getContext("2d");
const paymentsChart = document
    .querySelector("#payments_chart")
    .getContext("2d");

// charts
const chartsData = {
    salesData: {
        labels: ["Completed", "Pending", "In Progress", "Cancelled"],
        datasets: [
            {
                label: "",
                data: [150, 150, 100, 60],
                backgroundColor: ["#FF8200", "#FFB466", "#FFD2A3", "#FFE1C2"],
                hoverOffest: 10,
                borderRadius: 6,
                spacing: 5,
            },
        ],
    },

    customersData: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Customers",
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: ["#A78FE6", "#CBE0CC"],
                barThickness: 15,
                maxBarThickness: 20,
                borderRadius: 8,
            },
        ],
    },

    paymentsData: {
        labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ],
        datasets: [
            {
                label: "unpaid",
                data: [4000, 4000, 4800, 4000, 4000, 4800, 4000],
                fill: false,
                borderColor: "#725CFF",
                pointBackgroundColor: "#3A1CFC",
                pointBorderColor: "#fff",
                pointBorderWidth: 3,
                pointRadius: 0,
                pointHitRadius: 8,
                tension: 0.3,
            },
            {
                label: "paid",
                data: [3000, 3000, 3800, 3000, 3000, 3800, 3000],
                fill: false,
                borderColor: "#31C2F6",
                pointBackgroundColor: "#0095FF",
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
                pointRadius: 0,
                pointHitRadius: 8,
                tension: 0.3,
            },
        ],
    },
};

const saleChartOptions = {
    cutout: "80%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: true,
        },
    },
};

const customerChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: true,
            cartSize: 10,
        },
    },
    scales: {
        x: {
            offset: true,
            grid: {
                display: false,
            },
            border: {
                display:  false,
            }
        },
        y: {
            ticks: {
                display: false,
                stepSize: 18,
            },
            grid: {
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                lineWidth: 2,
            },
            border: {
                display: false,
                dash: [5, 14],
            },
        },
    },
};

const paymentChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: true,
        },
    },
    scales: {
        x: {
            offset: true,
            grid: {
                display: false,
            },
            ticks: {
                font: {
                    size: 12,
                    weight: "semibold",
                },
                color: "#646464",
                padding: 0,
            },
            border: {
                display: false
            }
        },
        y: {
            offset: true,
            beginAtZero: true,
            min: 0,
            max: 5000,
            ticks: {
                stepSize: 1000,
                callback: function (value) {
                    return value / 1000 + "k";
                },
            },
            grid: {
                lineWidth: 1,
            },
            border: {
                display: false,
                dash: [5, 10],
            },
        },
    },
};

const sales = new Chart(salesChart, {
    type: "doughnut",
    data: chartsData.salesData,
    options: saleChartOptions,
});

const customers = new Chart(customersChart, {
    type: "bar",
    data: chartsData.customersData,
    options: customerChartOptions,
});

const payments = new Chart(paymentsChart, {
    type: "line",
    data: chartsData.paymentsData,
    options: paymentChartOptions,
});
