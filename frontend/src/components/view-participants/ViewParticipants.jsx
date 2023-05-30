import styled from "styled-components";
import { useRef, useState } from "react";
import { api } from "../../services/partiman";
import { useRequestQuery, useToast } from "../../hooks";
import { requestKeyEnum } from "../../enums/requestKey";
import { Table } from "../table/Table";
import { Chart } from "../chart/Chart";
import { Loading, Subtitle, Title } from "../shared";

export function ViewParticipants() {
	const toast = useToast();
	const [view, setView] = useState("table");
	const { current: windowWidth } = useRef(window.innerWidth);
	const { data: participants, isLoading } = useRequestQuery({
		key: [requestKeyEnum.participants],
		requestCallback: api.listParticipants,
		onError: onRequestError,
	});

	const views = {
		table: tableView,
		doughnut: doughnutGraphView,
		bar: barGraphView,
	};

	function getCurrentViewStyle(mode) {
		return mode === view
			? {
					filter: "brightness(0.9)",
					borderBottomColor: "var(--medium-gray-light)",
			  }
			: {};
	}

	function setViewMode(mode) {
		setView(mode);
	}

	function onRequestError(error) {
		toast({
			text: error.cause?.message || "Could not get participants!",
			type: "error",
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
		const data = { head, body };

		return <Table {...data} />;
	}

	function doughnutGraphView() {
		const labels = participants.map(
			({ firstname, lastname }) => `${firstname} ${lastname}`
		);
		const datasetData = participants.map(({ participation }) => participation);
		const legend = {
			display: true,
			position: windowWidth <= 400 ? "top" : "right",
		};

		const data = {
			label: "participation (%)",
			labels,
			datasetData,
			legend,
		};

		return <Chart type="doughnut" {...data} />;
	}

	function barGraphView() {
		const labels = participants.map(
			({ firstname, lastname }) => `${firstname} ${lastname}`
		);
		const datasetData = participants.map(({ participation }) => participation);
		const legend = { display: false };

		const data = {
			label: "participation (%)",
			labels,
			datasetData,
			legend,
		};

		return <Chart type="bar" {...data} />;
	}

	return (
		<Wrapper>
			<Title>View Participants</Title>
			<Subtitle>
				View all participant information. Change the view mode in the menu
				below.
			</Subtitle>

			{isLoading && <Loading />}

			{!isLoading && participants && participants.length === 0 && (
				<span>There are no participants yet!</span>
			)}

			{!isLoading && participants && participants.length > 0 && (
				<>
					<Menu>
						<span
							onClick={() => setViewMode("table")}
							style={getCurrentViewStyle("table")}
						>
							Table
						</span>
						<span
							onClick={() => setViewMode("doughnut")}
							style={getCurrentViewStyle("doughnut")}
						>
							Doughnut Graph
						</span>
						<span
							onClick={() => setViewMode("bar")}
							style={getCurrentViewStyle("bar")}
						>
							Bar Graph
						</span>
					</Menu>

					{views[view]()}
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

const Menu = styled.nav`
	width: 100%;
	display: flex;
	margin: 2rem 0;
	border-bottom: 1px solid var(--medium-gray-light);
	font-size: 1rem;
	font-weight: 400;
	color: var(--medium-gray-dark);

	span {
		width: fit-content;
		padding: 0.3rem;
		margin: 0 0.4rem;
		border-radius: 3px 3px 0 0;
		background-color: var(--white);
		border-bottom: 2px solid transparent;
		cursor: default;

		:hover {
			font-weight: 500;
			border-bottom: 2px solid var(--medium-gray-light);
			filter: brightness(0.9);
		}
	}

	@media (max-width: 450px) {
		font-size: 0.9rem;

		span {
			border-bottom-width: 1px;
		}
	}
`;
