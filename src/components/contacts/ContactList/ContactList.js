import React from "react";
import { Link } from "react-router-dom";
import image from "../../../images/user.jpg";
import { useState, useEffect } from "react";
import ContactService from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

function ContactList() {
  let [query, setQuery] = useState({
    text: "",
  });
  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filterContacts: [],
    errrorMessage: "",
  });

  useEffect(() => {
    async function fetchData() {
      // You can await here
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        // console.log(response.data);
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filterContacts: response.data,
        });
      } catch (error) {
        setState({ ...state, errrorMessage: error.message, loading: false });
      }
      // ...
    }
    fetchData();
  }, []);

  // delete function
  const deleteData = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId);
      if (response) {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        // console.log(response.data);
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filterContacts: response.data,
        });
      }
    } catch (error) {
      setState({ ...state, errrorMessage: error.message, loading: false });
    }
  };
  // Binding search Text
  let searchContact = (event) => {
    setQuery({
      ...query,
      text: event.target.value,
    });
    let theContacts = state.contacts.filter(contact =>{
      return contact.name.toLowerCase().includes(event.target.value.toLowerCase())

    })
    setState({
      ...state,filterContacts:theContacts
    })
  };
  const { loading, contacts, errrorMessage, filterContacts } = state;
  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="contact-search p-3">
            <div className="container">
              <div className="grid">
                <div className="row">
                  <div className="col">
                    <p className="h3 fw-bold">
                      Contact Manager
                      <Link
                        to={"/contacts/add"}
                        className="btn btn-primary ms-2"
                      >
                        <i className="fa fa-plus-circle me-2" /> New
                      </Link>
                    </p>
                    <p className="fst-italic">
                      If you want to start measuring performance in your app,
                      pass a function
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <form className="row">
                      <div className="col">
                        <div className="mb-2">
                          <input
                            name="text"
                            value={query.text}
                            onChange={searchContact}
                            type="text"
                            className="form-control"
                            placeholder="Search Names"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-2">
                          <input
                            type="submit"
                            className="btn btn-outline-dark"
                            value="Search"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )}

      <section className="contact-list">
        <div className="container">
          <div className="row">
            {filterContacts.length > 0 &&
              filterContacts.map((contact) => {
                return (
                  <div className="col-md-6" key={contact.id}>
                    <div className="card my-2">
                      <div className="card-body">
                        <div className="row align-items-center d-flex justify-content-around">
                          <div className="col-md-4">
                            <img
                              src={contact.photo}
                              alt="user"
                              className="img-fluid contact-img"
                            />
                          </div>
                          <div className="col-md-7">
                            <ul className="list-group">
                              <li className="list-group-item list-group-item-action">
                                Name:{" "}
                                <span className="fw-bold"> {contact.name}</span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Mobile:{" "}
                                <span className="fw-bold">
                                  {" "}
                                  {contact.mobile}
                                </span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Email:
                                <span className="fw-bold">{contact.email}</span>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-1 d-flex flex-column align-items-center">
                            <Link
                              to={`/contacts/view/${contact.id}`}
                              className="btn btn-warning my-1"
                            >
                              <i className="fa fa-eye" />
                            </Link>
                            <Link
                              to={`/contacts/edit/${contact.id}`}
                              className="btn btn-primary my-1"
                            >
                              <i className="fa fa-pen" />
                            </Link>
                            <button
                              className="btn btn-danger my-1"
                              onClick={() => deleteData(contact.id)}
                            >
                              <i className="fa fa-trash" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filterContacts.length <= 0 ? "No Record available" :""}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default ContactList;
