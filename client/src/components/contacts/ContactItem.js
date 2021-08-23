import React from "react";
import { FaEnvelopeOpen, FaPhone } from "react-icons/fa";
import PropTypes from "prop-types";

export const ContactItem = ({ contact }) => {
  const { id, name, email, phone, type } = contact;
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice()}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <FaEnvelopeOpen style={{ marginRight: "10px" }} />
            {email}
          </li>
        )}
        {email && (
          <li>
            <FaPhone style={{ marginRight: "10px" }} />
            {phone}
          </li>
        )}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm">Edit</button>
        <button className="btn btn-danger btn-sm">Delete</button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
