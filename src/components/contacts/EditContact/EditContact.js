import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import image from "../../../images/user.jpg";
import ContactService from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

function EditContact() {
  let navigate = useNavigate();
  let { contactId } = useParams();
  let [state, setstate] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    },
    groups: [],
    errorMessage: "",
  });
  useEffect(() => {
    async function fetchData() {
      try {
        setstate({
          ...state,
          loading: true,
        });
        let response = await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroups();
        setstate({
          ...state,
          loading: false,
          contact: response.data,
          groups: groupResponse.data,
        });
      } catch (error) {
        setstate({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    }
    fetchData();
  }, [contactId]);
  let updateInput = (event) => {
    setstate({
      ...state,
      contact: { ...state.contact, [event.target.name]: event.target.value },
    });
  };

  let updateForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.updateContact(
        state.contact,
        contactId
      );
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setstate({
        ...state,
        errorMessage: error.message,
      });
      navigate(`/contacts/edit/${contactId}`, { replace: false });
    }
  };
  let { loading, contact, errorMessage, groups } = state;
  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="add-contact p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h4 fw-bold text-primary">Edit Contact</p>
                  <p className="fst-italic">
                    If you want to start measuring performance in your app, pass
                    a function
                  </p>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-md-4">
                  <form onSubmit={updateForm}>
                    <div className="mb-2">
                      <input
                        required={true}
                        onChange={updateInput}
                        name="name"
                        value={contact.name}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        onChange={updateInput}
                        name="photo"
                        value={contact.photo}
                        type="text"
                        className="form-control"
                        placeholder="Photo Url"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        onChange={updateInput}
                        name="mobile"
                        value={contact.mobile}
                        type="number"
                        className="form-control"
                        placeholder="Mobile"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        onChange={updateInput}
                        name="email"
                        value={contact.email}
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        onChange={updateInput}
                        name="company"
                        value={contact.company}
                        type="text"
                        className="form-control"
                        placeholder="Company"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        onChange={updateInput}
                        name="title"
                        value={contact.title}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        required={true}
                        onChange={updateInput}
                        name="groupId"
                        value={contact.groupId}
                        className="form-control"
                      >
                        <option value="">Select a Group</option>
                        {groups.length > 0 &&
                          groups.map((group) => {
                            return (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Update"
                      />
                      <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-6">
                  <img
                    src={contact.photo}
                    alt="user pic"
                    className="contact-img"
                  />
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default EditContact;
