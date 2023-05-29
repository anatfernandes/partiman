import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle } from "../../assets/styles/globalStyle";
import { QueryClientContextProvider } from "../../contexts";
import { ToastContainer } from "../../hooks";
import { Dashboard } from "../../pages";
import { Header } from "../header/Header";

function App() {
	useEffect(() => {
		const baseUrl = "http://localhost:5173/";
		if (window.location.href === baseUrl) {
			window.location.href = `${baseUrl}dashboard`;
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
				</Routes>
			</BrowserRouter>
		</QueryClientContextProvider>
	);
}

export default App;
