import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Button, Card, Modal, Form } from 'react-bootstrap';

function RenderWishList({ wishlist }) {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Link to={`/wishlist/${wishlist._id}`}><Card.Title>{wishlist.name}</Card.Title></Link>
            </Card.Body>
        </Card>

    );

}


const Home = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formSubmit, setSubmitForm] = useState({})

    const setSubmitField = (field, value) => {
        setSubmitForm({
          ...formSubmit,
          [field]: value
        })
      }

      const handleSubmit = e => {
        e.preventDefault();
        console.log(formSubmit);
        props.postWishList(formSubmit);
        setTimeout(function () {
            window.location.reload();
          }, 1000);
      }

      const handleDelete = e => {
        e.preventDefault();
        props.deleteAllWishList();
        setTimeout(function () {
            window.location.reload();
          }, 1000);
      }

    const wishlist = props.wishlist.wishlist.map((list) => {
        return (
            <div key={list._id} className="col-12 col-md-6">
                <RenderWishList wishlist={list}
                />
            </div>
        );
    });

    if (props.wishlist.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }

    else if (props.wishlist.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.wishlist.errMess}</h4>
                </div>
            </div>
        );
    }
    else
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Button onClick={handleShow}>Add</Button>
                    </div>
                    <div className="col-md-3">
                        <Button onClick={handleDelete}> Delete All</Button>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add a Wish</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form>
              <div class="row mb-4">
                <div class="col">
                  <div class="form-outline">
                    <Form.Control type='text' onChange={e => setSubmitField('name', e.target.value)} />
                    <Form.Label>Name</Form.Label>
                  </div>
                </div>
              </div>

              <div class="form-outline mb-4">
                <Form.Control type='text' onChange={e => setSubmitField('description', e.target.value)} />
                <Form.Label>Description</Form.Label>
              </div>

              <div class="form-outline mb-4">
                <Form.Control type='text' onChange={e => setSubmitField('author', e.target.value)} />
                <Form.Label>Author</Form.Label>
              </div>

              <button type="submit" class="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Submit</button>
            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="row">
                    {wishlist}

                </div>
            </div>
        );
}



export default Home;