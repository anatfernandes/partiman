import { BrowserRouter, Routes } from "react-router-dom";
import { GlobalStyle } from "../../assets/styles/globalStyle";
import { QueryClientContextProvider } from "../../contexts";
import { ToastContainer } from "../../hooks";
import { Header } from "../header/Header";

function App() {
	return (
		<QueryClientContextProvider>
			<ToastContainer />
			<GlobalStyle />

			<BrowserRouter>
				<Header />
<main>aaaa</main>
				<Routes></Routes>
			</BrowserRouter>
		</QueryClientContextProvider>
	);
}

export default App;
