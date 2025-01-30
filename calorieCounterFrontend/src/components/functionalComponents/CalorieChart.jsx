import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CalorieChart = ({ meals }) => {
    const data = {
        labels: meals.map(meal => meal.name),
        datasets: [{
            label: "Calories",
            data: meals.map(meal => meal.calories),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1
        }]
    };

    return <Bar data={data} />;
};

export default CalorieChart;