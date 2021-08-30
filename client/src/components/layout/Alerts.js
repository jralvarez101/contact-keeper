import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import { FaInfoCircle } from "react-icons/fa";

function Alerts() {
  const alertContext = useContext(AlertContext);
  const style = { marginRight: "10px" };

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <FaInfoCircle style={style} />
        {alert.msg}
      </div>
    ))
  );
}

export default Alerts;
