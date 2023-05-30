import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle } from "../../assets/styles/globalStyle";
import { QueryClientContextProvider } from "../../contexts";
import { ToastContainer } from "../../hooks";
import { Dashboard, SaveParticipant } from "../../pages";
import { Header } from "../header/Header";

function App() {
	useEffect(() => {
		if (window.location.pathname === "/") {
			window.location.pathname = "/dashboard";
		}
	}, []);

	return (
		<QueryClientContextProvider>
			<ToastContainer />
			<GlobalStyle />

			<BrowserRouter>
				<Header />

				<Routes>
					<Route index path="/dashboard" element={<Dashboard />} />
					<Route path="/save" element={<SaveParticipant />} />
				</Routes>
			</BrowserRouter>
		</QueryClientContextProvider>
	);
}

export default App;
