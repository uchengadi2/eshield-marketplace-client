import { useState } from "react";

export default function useRoleId() {
  const getRoleId = () => {
    const roleIdString = sessionStorage.getItem("token");
    const userRoleId = JSON.parse(roleIdString);
    return userRoleId?.roleId;
  };
  const [roleId, setRoleId] = useState(getRoleId());

  const saveRoleId = (userRoleId) => {
    if (userRoleId !== undefined) {
      sessionStorage.setItem("token", JSON.stringify(userRoleId));
      setRoleId(userRoleId.roleId);
    }
  };

  return {
    setRoleId: saveRoleId,
    roleId,
  };
}
