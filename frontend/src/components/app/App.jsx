import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle } from "../../assets/styles/globalStyle";
import { QueryClientContextProvider } from "../../contexts";
import { ToastContainer } from "../../hooks";
import { Dashboard } from "../../pages";
import { Header } from "../header/Header";

function App() {
	return (
		<QueryClientContextProvider>
			<ToastContainer />
			<GlobalStyle />

			<BrowserRouter>
				<Header />

				<Routes>
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</BrowserRouter>
		</QueryClientContextProvider>
	);
}

export default App;
