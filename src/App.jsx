import Header from "./components/Header";
import ContactForm from "./components/ContactForm";
import { Provider } from "./context";
function App() {
  return (
    <Provider>
      <Header />
      <ContactForm />
    </Provider>
  );
}

export default App;
