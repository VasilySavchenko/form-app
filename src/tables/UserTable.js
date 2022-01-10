import React, { useMemo } from "react";
import { Link } from "react-router-dom";
const UserTable = ({ users, deleteUser, showActions = true }) => {
  const usersMap = useMemo(() => {
    return users.reduce((names, user) => {
      const userKeys = user.data
        .map((i) => i[0])
        .filter((i) => names.indexOf(i) === -1);
      return [...names, ...userKeys];
    }, []);
  }, [users]);

  const usersData = useMemo(() => {
    return users.map(({ id, data }) => {
      return data.reduce(
        (res, field) => {
          return {
            ...res,
            [field[0]]: field[1],
          };
        },
        { id }
      );
    });
  }, [users]);

  console.log({ usersData });

  return (
    <table>
      <thead>
        <tr>
          {usersMap.map((key) => (
            <th key={key}>{key}</th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {usersData.length > 0 ? (
          usersData.map((user) => (
            <UserRow
              key={user.id}
              onDelete={deleteUser}
              schema={usersMap}
              data={user}
              showActions={showActions}
            />
          ))
        ) : (
          <tr>
            <td colSpan={6}>No Contact</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const UserRow = ({ schema, data, onDelete, showActions }) => (
  <tr>
    {schema.map((key) => (
      <td key={key}>{data[key]}</td>
    ))}
    {showActions ? (
      <td>
        <Link to={`/contacts/${data.id}`} className="button muted-button">
          edit
        </Link>
        <button
          onClick={() => onDelete(data.id)}
          className="button muted-button"
        >
          Delete
        </button>
      </td>
    ) : null}
  </tr>
);

export default UserTable;
