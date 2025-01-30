import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import "../../css/calorie.css"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CalorieChart = ({ meals }) => {
    const data = {
        labels: meals.map(meal => meal.name),
        datasets: [{
            label: "Calories",
            data: meals.map(meal => meal.calories),
            backgroundColor: "rgba(40, 234, 85, 1)",
            borderColor: "rgb(61, 219, 80)",
            borderWidth: 1
        },{
            label: "Protein",
            data: meals.map(meal => meal.protein),
            backgroundColor: "rgb(55, 227, 227)",
            borderColor: "rgb(99, 183, 219)",
            borderWidth: 1
        },{
            label: "Carbs",
            data: meals.map(meal => meal.carbs),
            backgroundColor: "rgba(40, 172, 228, 0.87)",
            borderColor: "rgb(71, 203, 208)",
            borderWidth: 1
        },{
            label: "Fats",
            data: meals.map(meal => meal.fats),
            backgroundColor: "rgb(232, 54, 54)",
            borderColor: "rgb(187, 84, 84)",
            borderWidth: 1
        }]
    };

    return <Bar data={data} className='chartContainer' />;
};

export default CalorieChart;