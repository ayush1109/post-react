import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Button, Card, Modal, Form } from 'react-bootstrap';

function RenderPost({ post }) {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Link to={`/post/${post._id}`}><Card.Title>{post.title}</Card.Title></Link>
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
        props.writePost(formSubmit);
        setTimeout(function () {
            window.location.reload();
        }, 1000);
    }

    const handleDelete = e => {
        e.preventDefault();
        props.deleteAllPost();
        setTimeout(function () {
            window.location.reload();
        }, 1000);
    }

    const handleLogout = e => {
        e.preventDefault();
        props.logoutUser();
    }

    if (props.post.post === null) {
        return (
            <div>
                <div className="row">
                    <div className="col-md-3">
                        <Button onClick={handleShow}>Add</Button>
                    </div>
                    <div className="col-md-3">
                        <Button onClick={handleDelete}> Delete All</Button>
                    </div>
                    <div className="col-md-3">
                        <Button onClick={handleLogout}> Logout</Button>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add a Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <div class="row mb-4">
                                    <div class="col">
                                        <div class="form-outline">
                                            <Form.Control type='text' onChange={e => setSubmitField('title', e.target.value)} />
                                            <Form.Label>Title</Form.Label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-outline mb-4">
                                    <Form.Control type='text' onChange={e => setSubmitField('description', e.target.value)} />
                                    <Form.Label>Description</Form.Label>
                                </div>

                                <button type="submit" class="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Submit</button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                You have no posts

            </div>
        );
    }
    const post = props.post.post.map((list) => {
        return (
            <div key={list._id} className="col-12 col-md-6">
                <RenderPost post={list}
                />
            </div>
        );
    });

    if (props.post.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }

    else if (props.post.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.post.errMess}</h4>
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
                    <div className="col-md-3">
                        <Button onClick={handleLogout}> Logout</Button>
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add a Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <div class="row mb-4">
                                    <div class="col">
                                        <div class="form-outline">
                                            <Form.Control type='text' onChange={e => setSubmitField('title', e.target.value)} />
                                            <Form.Label>Title</Form.Label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-outline mb-4">
                                    <Form.Control type='text' onChange={e => setSubmitField('description', e.target.value)} />
                                    <Form.Label>Description</Form.Label>
                                </div>

                                <button type="submit" class="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Submit</button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="row">
                    {post}

                </div>
            </div>
        );
}



export default Home;