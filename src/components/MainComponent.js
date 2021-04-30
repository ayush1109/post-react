import React, {Component} from 'react';
import Home from './HomeComponent';
import WishListDetail from './WishListDetailComponent';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {fetchWishList, postWishList, deleteAllWishList, deleteWishList, writeWishList, updateWishList} from '../redux/ActionCreators';
const mapStateToProps = state => {
    return {
      wishlist: state.wishlist
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    fetchWishList: () => { dispatch(fetchWishList()) },
    postWishList: (data) => { dispatch(postWishList(data))},
    deleteAllWishList: () => { dispatch(deleteAllWishList())},
    deleteWishList: (id) => { dispatch(deleteWishList(id))},
    writeWishList: (data) => { dispatch(writeWishList(data))},
    updateWishList: (data, id) => { dispatch(updateWishList(data, id))}
    });


class Main extends Component {
    constructor(props) {
        super(props);
        console.log(props);
      }
    
      componentDidMount() {
        this.props.fetchWishList();
      }
    render() {
        const homePage = () => {
            return (
                <Home wishlist={this.props.wishlist}
                 isLoading={this.props.wishlist.isLoading}
                 errMess={this.props.wishlist.errMess}
                 deleteAllWishList={this.props.deleteAllWishList}
                 postWishList={this.props.postWishList}
                 />
            );
        }

        const wishlistWithId = ({ match }) => {
            return (
              <WishListDetail wishlist={this.props.wishlist.wishlist.filter((list) => list._id === (match.params.wishlistId))[0]}
                isLoading={this.props.wishlist.isLoading}
                errMess={this.props.wishlist.errMess}
                updateWishList={this.props.updateWishList}
                deleteWishList={this.props.deleteWishList}
                >
              </WishListDetail>
            );
          }

        return (
            <div className="container">
                <Switch>
                <Route exact path='/wishlist' component={homePage} />
                <Route path='/wishlist/:wishlistId' component={wishlistWithId} />
                <Redirect to='/wishlist'  />
            </Switch>

            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));