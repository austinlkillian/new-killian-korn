import React, {Component} from 'react';
import axios from 'axios';
import {updateUser} from './../../ducks/users';
import {connect} from 'react-redux';
import './Private.css';

class Private extends Component {

    constructor(props){
        super(props)

        this.state = {
            user:{}
        }
    }

    async componentDidMount() {
        let userData = await axios.get('/api/user-data');
        this.props.updateUser(userData.data)
    }

    render() {
        let {user} = this.props
        console.log(user)
        return(
            <div className='body'>
                <h1>Account Details</h1>
                <hr/><hr/><hr/>
                {
                    user.user_name ? (
                        <div>
                            <p>Account Holder: {user.user_name}</p>
                            <p>Email: {user.email}</p>
                            <p>Account Id: {user.auth_id}</p>
                            <img src={user.picture} alt="" />
                        </div>
                    )
                    : (<p>Please log in</p>)
                }
                <a href='http://localhost:3050/auth/logout'><button>Logout</button></a>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {updateUser})(Private);