import React, { Component } from 'react';
import Home from './HomeComponent';
import PostDetail from './PostDetailComponent';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { fetchPosts, writePost, deleteAllPost, deletePost, updatePost, signupUser, loginUser, logoutUser } from '../redux/ActionCreators';
import { Button } from 'react-bootstrap';
import Home2 from './Home2Component';
const mapStateToProps = state => {
  return {
    post: state.post,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => { dispatch(fetchPosts()) },
  deleteAllPost: () => { dispatch(deleteAllPost()) },
  deletePost: (id) => { dispatch(deletePost(id)) },
  writePost: (data) => { dispatch(writePost(data)) },
  updatePost: (data, id) => { dispatch(updatePost(data, id)) },
  loginUser: (creds) => { dispatch(loginUser(creds)) },
  signupUser: (creds) => { dispatch(signupUser(creds)) },
  logoutUser: () => { dispatch(logoutUser()) }

});


class Main extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {


    const homePage = () => {
      return (
        this.props.auth.isAuthenticated
        ?
        <Home post={this.props.post}
          isLoading={this.props.post.isLoading}
          errMess={this.props.post.errMess}
          deleteAllPost={this.props.deleteAllPost}
          writePost={this.props.writePost}
          logoutUser={this.props.logoutUser}
        />
        :
          <Home2 loginUser={this.props.loginUser} signupUser={this.props.signupUser} />
      );
    }

    const postWithId = ({ match }) => {
      return (
        <PostDetail post={this.props.post.post.filter((list) => list._id === (match.params.postId))[0]}
          isLoading={this.props.post.isLoading}
          errMess={this.props.post.errMess}
          updatePost={this.props.updatePost}
          deletePost={this.props.deletePost}
        >
        </PostDetail>
      );
    }

    return (
      <div className="container">
        <Switch>
          <Route exact path='/post' component={homePage} />
          <Route path='/post/:postId' component={postWithId} />
          <Redirect to='/post' />
        </Switch>
        

      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));