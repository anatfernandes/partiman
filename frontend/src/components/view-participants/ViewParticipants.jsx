import styled from "styled-components";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useListParticipants } from "../../hooks";
import { Icon, Loading, Subtitle, Title } from "../shared";
import { Table } from "../table/Table";
import { Chart } from "../chart/Chart";

export function ViewParticipants({
	allowEditing = false,
	textAlign = "center",
	onHandleDelete = () => {},
}) {
	const titleConfig = { align: textAlign };

	const [viewMode, setViewMode] = useState("table");
	const { current: windowWidth } = useRef(window.innerWidth);
	const { participants, isLoading } = useListParticipants({});

	const views = {
		table: tableView,
		doughnut: doughnutGraphView,
		bar: barGraphView,
	};

	function getClassName(mode) {
		return mode === viewMode ? "current-mode" : "";
	}

	function getFormattedDataToGraph() {
		const labels = participants.map(
			({ firstname, lastname }) => `${firstname} ${lastname}`
		);
		const datasetData = participants.map(({ participation }) => participation);
		const legend = {
			display: true,
			position: windowWidth <= 400 ? "top" : "right",
		};

		return {
			legend,
			labels,
			datasetData,
			label: "participation (%)",
		};
	}

	function addEditHeadersInTable(head) {
		head.push("Edit", "Delete");
	}

	function addEditFieldsInTable(body) {
		body.forEach((participant, index) => {
			const participantData = participants[index];

			const editField = (
				<Link to="/save" state={participantData}>
					<Icon type="edit" config={{ color: "#38B9E2" }} />
				</Link>
			);
			const deletionField = (
				<Icon
					type="trash"
					config={{ color: "#FF0000", title: "delete" }}
					onClick={() => onHandleDelete(participantData._id)}
				/>
			);

			participant.push(editField, deletionField);
		});
	}

	function tableView() {
		const head = ["", "First name", "Last name", "Participation"];
		const body = participants.map((participant, index) => [
			index + 1,
			participant.firstname,
			participant.lastname,
			`${participant.participation}%`,
		]);

		if (allowEditing) {
			addEditHeadersInTable(head);
			addEditFieldsInTable(body);
		}

		const data = { head, body };

		return <Table {...data} />;
	}

	function doughnutGraphView() {
		const data = getFormattedDataToGraph();
		return <Chart type="doughnut" {...data} />;
	}

	function barGraphView() {
		const data = getFormattedDataToGraph();
		data.legend = { display: false };

		return <Chart type="bar" {...data} />;
	}

	return (
		<Wrapper>
			<Title config={titleConfig}>View Participants</Title>

			<Subtitle config={titleConfig}>View participants information.</Subtitle>

			{isLoading && <Loading />}

			{!isLoading && participants && participants.length === 0 && (
				<NoParticipants>There are no participants yet!</NoParticipants>
			)}

			{!isLoading && participants && participants.length > 0 && (
				<>
					<Subtitle config={titleConfig}>
						Change the view mode in the menu below.
					</Subtitle>

					<Menu>
						<li
							onClick={() => setViewMode("table")}
							className={getClassName("table")}
						>
							Table
						</li>
						<li
							onClick={() => setViewMode("doughnut")}
							className={getClassName("doughnut")}
						>
							Doughnut Graph
						</li>
						<li
							onClick={() => setViewMode("bar")}
							className={getClassName("bar")}
						>
							Bar Graph
						</li>
					</Menu>

					{views[viewMode]()}
				</>
			)}
		</Wrapper>
	);
}

const Wrapper = styled.section`
	width: 100%;
	overflow: hidden;
	margin: 1rem 0;
`;

const Menu = styled.ul`
	width: 100%;
	display: flex;
	margin: 2rem 0;
	border-bottom: 1px solid var(--medium-gray-light);
	font-size: 1rem;
	font-weight: 400;
	color: var(--medium-gray-dark);

	li {
		width: fit-content;
		padding: 0.3rem;
		margin: 0 0.4rem;
		border-radius: 3px 3px 0 0;
		background-color: var(--white);
		border-bottom: 2px solid transparent;
		cursor: default;

		&.current-mode,
		:hover {
			border-bottom-color: var(--medium-gray-light);
			filter: brightness(0.9);
		}

		:hover {
			font-weight: 500;
		}
	}

	@media (max-width: 450px) {
		font-size: 0.9rem;

		li {
			border-bottom-width: 1px;
		}
	}
`;

const NoParticipants = styled.span`
	font-size: 1rem;
	line-height: 1.2rem;
	font-weight: 400;
	color: var(--medium-gray-dark);
	margin: 2rem 0;
	display: inherit;
`;
