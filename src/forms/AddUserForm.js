import React, { useState } from "react";

const AddUserForm = (props) => {
  const initialFormState = {
    id: null,
    data: [
      ["name", ""],
      ["lastName", ""],
      ["email", ""],
      ["country", ""],
      ["city", ""],
      ["phone", ""],
    ],
  };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const handleChange = (val, index) => {
    setUser((curUser) => {
      const data = curUser.data.slice(0);
      data[index][1] = val;
      return { ...curUser, data };
    });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // if (!user.name || !user.lastName) return;
        debugger;
        props.addUser(user);
        setUser(initialFormState);
      }}
    >
      {user.data.map((field, index) => (
        <div key={field[0]}>
          <label>{field[0]}</label>
          <input
            type="text"
            value={field[1]}
            onChange={(e) => handleChange(e.target.value, index)}
          />
        </div>
      ))}
      <button className="add-button">Add new contact</button>
    </form>
  );
};

export default AddUserForm;
