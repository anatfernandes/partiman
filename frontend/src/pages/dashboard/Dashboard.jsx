import { useState } from "react";
import { useDeleteParticipant } from "../../hooks";
import { Title, Modal } from "../../components/shared";
import { CreateParticipant } from "../../components/create-participant/CreateParticipant";
import { ViewParticipants } from "../../components/view-participants/ViewParticipants";

export function Dashboard() {
	const [modalConfig, setModalConfig] = useState({ isOpen: false });
	const deleteParticipant = useDeleteParticipant({
		onSuccess: () => setModalConfig({ isOpen: false }),
	});

	function onHandleDelete(participant) {
		setModalConfig({
			isOpen: true,
			participant,
		});
	}

	return (
		<main>
			<Modal
				modalConfig={modalConfig}
				setModalConfig={setModalConfig}
				nextCallback={() => deleteParticipant(modalConfig.participant)}
			/>

			<Title config={{ align: "center" }}>Dashboard</Title>

			<CreateParticipant />
			<ViewParticipants
				allowEditing={true}
				textAlign="start"
				onHandleDelete={onHandleDelete}
			/>
		</main>
	);
}
