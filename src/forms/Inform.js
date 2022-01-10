import React, { useState } from "react";
import { useParams } from "react-router-dom";

import UserTable from "../tables/UserTable";

const Inform = (props) => {
  const { contactId } = useParams();
  const { users } = props;
  const [showAddForm, setShowAddForm] = useState(false);
  const [addonData, setAddonData] = useState({ key: "", value: "" });
  const foundContact = users.find(
    (contact) => contact.id === Number(contactId)
  );

  const handleChange = (key, val) => {
    setAddonData((res) => ({ ...res, [key]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...foundContact,
      data: [...foundContact.data, [addonData.key, addonData.value]],
    };
    const usersToSave = users.slice(0);
    debugger;
    const userIndex = users.findIndex(({ id }) => id == contactId);
    usersToSave[userIndex] = updatedUser;
    props.setUsers(usersToSave);
    setAddonData({ key: "", value: "" });
  };

  if (!foundContact) {
    return "Not found";
  }

  return (
    <div>
      <button onClick={() => setShowAddForm(true)}>Add Info</button>
      {!!showAddForm && (
        <form onSubmit={handleSubmit}>
          <label>Prop Name</label>
          <input
            value={addonData.key}
            onChange={(e) => handleChange("key", e.target.value)}
          />
          <label>Prop Value</label>
          <input
            value={addonData.value}
            onChange={(e) => handleChange("value", e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      )}
      <UserTable users={[foundContact]} showActions={false} />
    </div>
  );
};

export default Inform;
