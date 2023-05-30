import { CreateParticipant } from "../../components/create-participant/CreateParticipant";
import { Title } from "../../components/shared";
import { ViewParticipants } from "../../components/view-participants/ViewParticipants";

export function Dashboard() {
	return (
		<main>
			<Title config={{ align: "center" }}>Dashboard</Title>

			<CreateParticipant />
			<ViewParticipants edit={true} textAlign="start" />
		</main>
	);
}
