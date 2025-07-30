import { Outlet, useRoutes } from "react-router-dom"
import { routeLists } from "./routes/routeLists"

function App() {
  const element = useRoutes(routeLists);
  return element || <Outlet />
}

export default App
