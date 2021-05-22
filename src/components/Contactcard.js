import React from "react";
import user from "../images/user.png";
import { Link } from "react-router-dom";
const Contactcard = (props) => {
  const { id, name, email } = props.contact;
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" /> 
      <div className="content">
        <Link
          to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}
        >
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      <i
        className="trash alternate outline icon"
        style={{
          color: "red",
          // fontSize: "19px",

          marginTop: "7px",
          // marginLeft:"10px",
          cursor: "pointer",
        }}
        onClick={() => props.clickHandler(id)}
      ></i>
      <Link
          to={{ pathname: `/edit`, state: { contact: props.contact } }}>
          <i
          className="edit alternate outline icon"
          style={{
          
            color: "blue",
            // fontSize: "19px",
            marginTop: "7px",
            marginLeft:"10px",
            cursor: "pointer",
          }}
        ></i>
        </Link>
        </div>

    </div>
  );
};

export default Contactcard;
