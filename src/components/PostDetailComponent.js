import React, {useState} from 'react';
import {Loading} from './LoadingComponent';
import {Breadcrumb, BreadcrumbItem, Button, Modal, Form} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

function RenderPostDetails({ post, updatePost, deletePost}) {
    const history = useHistory();
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
        updatePost(formSubmit, post._id );
        setTimeout(function () {
            window.location.reload();
          }, 1000);
      }

      const handleDelete = e => {
        e.preventDefault();
        deletePost(post._id);
        setTimeout(function () {
            history.push('/post');
            window.location.reload();
          }, 1000);
      }



    if (post != null) {
        return (
            <div className="container">
                <h1>Title - {post.title}</h1>
                <h5>By - {post.author.username}</h5>
                <p>Description - {post.description}</p>
                <div className="row">
                    <div className="col-md-6">
                    <Button onClick={handleShow}>Edit</Button>
                    </div>
                    <div className="col-md-3">
                <Button onClick={handleDelete}>Delete</Button>
                </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit the Post</Modal.Title>
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

              <div class="form-outline mb-4">
                <Form.Control type='text' onChange={e => setSubmitField('author', e.target.value)} />
                <Form.Label>Author</Form.Label>
              </div>

              <button type="submit" class="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Submit</button>
            </Form>
                        </Modal.Body>
                    </Modal>
                
            </div>
        );
    }
    else {
        return (
            <div>

            </div>
        );
    }
}

const PostDetail = (props) => {
    

    if (props.isLoading)
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );

    else if (props.errMess)
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    else if (props.post == null) {
        console.log(props)
        return <div>props.product is null</div>
    }
    else
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/post">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.post.title}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row rst">
                    <RenderPostDetails post={props.post} updatePost={props.updatePost} deletePost={props.deletePost} />
                    
                </div>
            </div>

        );
}



export default PostDetail;