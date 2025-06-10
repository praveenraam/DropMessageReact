import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import MessageForm from './Component/Messages/MessageForm';
import FindBySlug from './Component/Messages/FindBySlug';
import NavBar from './Component/layouts/NavBar'
import ViewMessage from "./Component/Messages/ViewMessage";
import Profile from "./Component/User/Profile";

const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/message/create" element={<MessageForm />} />
      <Route path="/findbyslug" element={<FindBySlug /> } />
      <Route path="/findbyslug/:slug" element={<ViewMessage />} />
      <Route path="/u/:username" element={<Profile  />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <NavBar />
      <AppRoutes />
    </Router>
  );
}

export default App;
