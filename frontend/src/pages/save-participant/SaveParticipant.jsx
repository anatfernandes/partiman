import { Subtitle, Title } from "../../components/shared";
import { CreateParticipant } from "../../components/create-participant/CreateParticipant";

export function SaveParticipant() {
	return (
		<main>
			<Title config={{ align: "center" }}>Save</Title>

			<Subtitle config={{ align: "center" }}>
				Edit or create new participants below
			</Subtitle>

			<CreateParticipant expand={false} />
		</main>
	);
}
