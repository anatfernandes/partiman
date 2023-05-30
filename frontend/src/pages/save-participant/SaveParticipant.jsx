import { Subtitle, Title } from "../../components/shared";
import { CreateParticipant } from "../../components/create-participant/CreateParticipant";
import { useLocation, useNavigation } from "react-router-dom";
import { useEffect, useState } from "react";

export function SaveParticipant() {
	const location = useLocation();
	const [defaultParticipant, setDefaultParticipant] = useState({});

	useEffect(() => {
		if (!location.state) {
			setDefaultParticipant({});
			return;
		}

		const { firstname, lastname, participation } = location.state;
		setDefaultParticipant({ firstname, lastname, participation });
	}, [location.state]);

	return (
		<main>
			<Title config={{ align: "center" }}>Save</Title>

			<Subtitle config={{ align: "center" }}>
				Edit or create new participants below
			</Subtitle>

			<CreateParticipant
				expand={false}
				defaultParticipant={defaultParticipant}
			/>
		</main>
	);
}
