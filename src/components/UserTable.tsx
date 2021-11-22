import React from "react";
import { UserContext } from "../context/users-context";
import { useContext } from "react";

const UserTable: React.FC = () => {
const userContext = useContext(UserContext);

console.log(userContext)

	return <div>UserTable</div>;
};

export default UserTable;
