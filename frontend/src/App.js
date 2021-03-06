import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./pages/Dashboard";

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
