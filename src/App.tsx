import Sidebar from "components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { AppContainer } from "styles";

function App() {
  return (
    <AppContainer>
      <Sidebar />
      <Outlet />
    </AppContainer>
  );
}

export default App;
