import React from "react";
import "./App.css";
import MainPage from "./pages/Main";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button, Layout, Menu } from "antd";
import CardInfo from "./pages/CardInfo";
import CreatePerson from "./pages/CreatePerson";
const { Header, Content } = Layout;
function App() {
  const items = Array.from({ length: 1 }).map((_, index) => ({
    key: String(index + 1),
    label: `Домой`,
  }));

  return (
    <Router>
      <Layout>
        <Header
          className="app__header"
        >
          <Link to="/Rick_and_Morty_CRUD/create-person"><Button type="primary">Создать персонажа</Button></Link>
          <Link to="/Rick_and_Morty_CRUD">
          <Menu
            theme="dark"
            items={items}
            className="app__menu"
          /></Link>
        </Header>
        <Content>
          <div
            className="app__contet"
          >
            <Routes>
              <Route path="/Rick_and_Morty_CRUD" element={<MainPage />} />
              <Route path="/Rick_and_Morty_CRUD/:id" element={<CardInfo />} />
              <Route path="/Rick_and_Morty_CRUD/create-person" element={<CreatePerson />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
