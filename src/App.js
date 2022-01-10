import React, { useState, Fragment, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AddUserForm from "./forms/AddUserForm";
import UserTable from "./tables/UserTable";
import Inform from "./forms/Inform";

const App = () => {
  const [users, setUsers] = useState(() => {
    const raw = localStorage.getItem("users");
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    alert("Sure you want to delete the contact?");
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="container">
      <header className="header">
        <nav>
          <ul>
            <Link to="/" className="header-link">
              Add-Contact
            </Link>
            <Link to="/contacts" className="header-link">
              Contact
            </Link>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <section className="a">
              <div>
                <h2>Add Contacts</h2>
                <AddUserForm addUser={addUser} />
              </div>
              <div>
                <h2>View Contact</h2>
                <UserTable users={users} deleteUser={deleteUser} />
              </div>
            </section>
          }
        />
        <Route
          exact
          path="/contacts/:contactId"
          element={<Inform users={users} setUsers={setUsers} />}
        />
      </Routes>
    </div>
  );
};

export default App;
