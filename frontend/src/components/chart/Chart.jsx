import { Doughnut, Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
} from "chart.js";

ChartJS.register(
	ArcElement,
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
	Legend,
	Title
);

const optionsLegendDefault = {
	display: true,
	position: "right",
};

const optionsTitleDefault = {
	display: false,
	text: "",
};

const colors = [
	"rgb(156, 92, 184)",
	"rgb(82, 187, 155)",
	"rgb(234, 75, 53)",
	"rgb(189, 195, 200)",
	"rgba(255, 206, 86, 1)",
	"rgba(255, 99, 132, 1)",
	"rgb(44, 150, 221)",
	"rgba(153, 102, 255, 1)",
	"rgba(75, 192, 192, 1)",
];

export function Chart({
	type = "doughnut",
	label = "",
	labels = [],
	datasetData = [],
	legend = optionsLegendDefault,
	title = optionsTitleDefault,
}) {
	const data = {
		labels,
		datasets: [
			{
				label: label,
				data: datasetData,
				backgroundColor: colors,
				borderColor: ["white"],
				borderWidth: 3,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend,
			title,
		},
	};

	const style = { maxHeight: "300px" };

	const charts = {
		doughnut: <Doughnut data={data} options={options} style={style} />,
		bar: <Bar data={data} options={options} style={style} />,
	};

	return charts[type] || <></>;
}
