import { GlobalStyle } from "../../assets/styles/globalStyle";
import { QueryClientContextProvider } from "../../contexts";

function App() {
	return (
		<QueryClientContextProvider>
			<GlobalStyle />

			<p>project initialized</p>
		</QueryClientContextProvider>
	);
}

export default App;
