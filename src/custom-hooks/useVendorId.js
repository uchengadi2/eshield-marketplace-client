import { useState } from "react";

export default function useVendorId() {
  const getVendorId = () => {
    const vendorIdString = sessionStorage.getItem("token");
    const userVendorId = JSON.parse(vendorIdString);
    return userVendorId?.vendorId;
  };
  const [vendorId, setVendorId] = useState(getVendorId());

  const saveVendorId = (userVendorId) => {
    if (userVendorId !== undefined) {
      sessionStorage.setItem("token", JSON.stringify(userVendorId));
      setVendorId(userVendorId.vendorId);
    }
  };

  return {
    setVendorId: saveVendorId,
    vendorId,
  };
}
