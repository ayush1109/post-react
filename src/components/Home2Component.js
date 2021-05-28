import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Button, Card, Modal, Form } from 'react-bootstrap';

function Home2(props) {
    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [formSubmit1, setSubmitForm1] = useState({})

    const setSubmitField1 = (field, value) => {
        setSubmitForm1({
          ...formSubmit1,
          [field]: value
        })
      }

      const handleSubmit1 = e => {
        e.preventDefault();
        console.log(formSubmit1);
        props.signupUser(formSubmit1);
        setTimeout(function () {
            window.location.reload();
          }, 1000);
      }


      const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [formSubmit2, setSubmitForm2] = useState({})

    const setSubmitField2 = (field, value) => {
        setSubmitForm2({
          ...formSubmit2,
          [field]: value
        })
      }

      const handleSubmit2 = e => {
        e.preventDefault();
        console.log(formSubmit2);
        props.loginUser(formSubmit2);
      }
    return (
        <div className="container">Login to see your notes
          <div className="buttons">
            <Button onClick={handleShow1}>Signup</Button>
            <Button onClick={handleShow2}>Login</Button>
          </div>
          <div className="modal-1">
          <Modal show={show1} onHide={handleClose1}>
                          <Modal.Header closeButton>
                              <Modal.Title>Signup</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                          <Form>
                <div class="row mb-4">
                  <div class="col">
                    <div class="form-outline">
                      <Form.Control type='text' onChange={e => setSubmitField1('username', e.target.value)} />
                      <Form.Label>Username</Form.Label>
                    </div>
                  </div>
                </div>
  
                <div class="form-outline mb-4">
                  <Form.Control type='password' onChange={e => setSubmitField1('password', e.target.value)} />
                  <Form.Label>Password</Form.Label>
                </div>
  
                <div class="form-outline mb-4">
                  <Form.Control type='text' onChange={e => setSubmitField1('firstname', e.target.value)} />
                  <Form.Label>First Name</Form.Label>
                </div>
  
                <div class="form-outline mb-4">
                  <Form.Control type='text' onChange={e => setSubmitField1('lastname', e.target.value)} />
                  <Form.Label>Last Name</Form.Label>
                </div>
  
                <button type="submit" class="btn btn-primary btn-block mb-4" onClick={handleSubmit1}>Submit</button>
              </Form>
                          </Modal.Body>
                      </Modal>
          </div>
  
          <div className="modal-2">
          <Modal show={show2} onHide={handleClose2}>
                          <Modal.Header closeButton>
                              <Modal.Title>Login</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                          <Form>
                <div class="row mb-4">
                  <div class="col">
                    <div class="form-outline">
                      <Form.Control type='text' onChange={e => setSubmitField2('username', e.target.value)} />
                      <Form.Label>Username</Form.Label>
                    </div>
                  </div>
                </div>
  
                <div class="form-outline mb-4">
                  <Form.Control type='password' onChange={e => setSubmitField2('password', e.target.value)} />
                  <Form.Label>Password</Form.Label>
                </div>
  
                <button type="submit" class="btn btn-primary btn-block mb-4" onClick={handleSubmit2}>Submit</button>
              </Form>
                          </Modal.Body>
                      </Modal>
          </div>
          </div>
    );
}

export default Home2;