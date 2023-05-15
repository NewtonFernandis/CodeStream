import "./App.css";
import CodeEditor from "./components/codeEditor";
import { v4 as uuidv4 } from "uuid";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={`/code-editor/${uuidv4()}`} />,
    },
    { path: "/code-editor/:id", element: <CodeEditor /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
