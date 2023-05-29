import styled from "styled-components";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../shared/Icon";
import logoFull from "/full-logo.svg";
import logo from "/logo.svg";

export function Header() {
	const windowWidth = useRef(window.innerWidth);

	const largeIconConfig = { size: "1.5rem", color: "#38B9E2" };
	const smallIconConfig = { ...largeIconConfig, size: "1.3rem" };
	const iconConfig =
		windowWidth.current >= 500 ? largeIconConfig : smallIconConfig;

	const imageSrc = windowWidth.current >= 500 ? logoFull : logo;

	return (
		<Wrapper>
			<img src={imageSrc} alt="Partiman" />

			<div>
				<Link to="/dashboard" title="Dashboard">
					<Icon type="home" config={{ ...iconConfig, title: "Dashboard" }} />
					<span>Dashboard</span>
				</Link>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.header`
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.5rem 1rem;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 2;
	box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
	background-color: #ffffff;

	> img {
		height: 100%;
		width: auto;
	}

	> div {
		display: flex;
		align-items: center;
	}

	a {
		height: 100%;
		padding: 0.1rem 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 3px;
		margin: 0 0.2rem;
		background-color: #ffffff;
		color: var(--medium-gray-dark);
		font-size: 0.7rem;
		font-weight: 500;
		transition: all 0.1s linear;
		cursor: pointer;

		svg {
			margin-bottom: 0.1rem;
			font-size: 0.4rem;
		}

		:hover,
		:focus-visible {
			filter: brightness(0.9);
			outline: none;
		}
	}

	@media (max-width: 500px) {
		a {
			font-size: 0.6rem;

			svg {
				font-size: 0.3rem;
			}
		}
	}
`;
