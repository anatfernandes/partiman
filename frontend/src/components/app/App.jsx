import { GlobalStyle } from "../../assets/styles/globalStyle";
import { QueryClientContextProvider } from "../../contexts";
import { ToastContainer } from "../../hooks";

function App() {
	return (
		<QueryClientContextProvider>
			<ToastContainer />
			<GlobalStyle />

			<p>project initialized</p>
		</QueryClientContextProvider>
	);
}

export default App;
