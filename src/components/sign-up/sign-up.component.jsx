import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {SignUpContainer, SignUpTitle} from './sign-up.styles';
import {connect} from 'react-redux';
import {signUpStart, userInputChange} from '../../redux/user/user.actions';
import {createStructuredSelector} from 'reselect';
import {selectConfirmPassword, selectDisplayName, selectEmail, selectPassword} from '../../redux/user/user.selectors';

class SignUp extends React.Component {
    handleSubmit = async event => {
        event.preventDefault();

        const {email, displayName, password, confirmPassword, signUp} = this.props;

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        signUp({email, password, displayName});
    };

    handleChange = event => {
        const {userInputChange} = this.props;

        userInputChange(event.target);
    };

    render() {
        const {displayName, email, password, confirmPassword} = this.props;
        return (
            <SignUpContainer>
                <SignUpTitle>I do not have a account</SignUpTitle>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </SignUpContainer>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    displayName: selectDisplayName,
    email: selectEmail,
    password: selectPassword,
    confirmPassword: selectConfirmPassword
});

const mapDispatchToProps = dispatch => ({
    signUp: ({displayName, email, password}) => dispatch(signUpStart({displayName, email, password})),
    userInputChange: input => dispatch(userInputChange(input))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
