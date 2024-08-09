import Sidebar from "components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Container } from "styles";

function App() {
  return (
    <Container>
      <Sidebar />
      <Outlet />
    </Container>
  );
}

export default App;
