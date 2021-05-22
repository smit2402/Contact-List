import React, { useRef }from "react";
import Contactcard from "./Contactcard";
import { Link } from "react-router-dom";
function Contactlist(props) {

  console.log(props);
  const inputEl = useRef("");
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };


  const renderContactlist = props.contacts.map((contact) => {
    return (
      <Contactcard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      />
    );
  });

const getSearchTerm =()=>{
props.searchKeyword(inputEl.current.value)};

  return (
    <div className="main">
      <br />
      <br />
      <h2>
        Contact List&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/add">
          <button className="ui button blue Right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input 
          ref={inputEl}
          type="text" placeholder="search contact" className="propmt" value={props.term}  onChange={getSearchTerm} />
          <i className="search icon"></i>       
           </div>
      </div>
      <div className="ui celled list">{renderContactlist.length > 0 ? renderContactlist : <div class="ui negative message"><div class="header">No Contact Available</div></div>}</div>
    </div>
  );
}

export default Contactlist;
