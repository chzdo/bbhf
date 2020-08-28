import React from 'react'
import ReactDom from 'react-dom'
import InputText from './input'
import { SelectInput } from './input'
import Toast from './toast'
import Activity from './reactact'
import apiClient from './axios'
import Loader from './loader'

export default class Reset extends React.Component {

    constructor(props) {
        super(props)
        this.activity = new Activity(this)
        this.state = {
            invalid: false,
            loader: false,
            toast: {
                show: false,
                color: '',
                title: '',
                message: '',

            },
            config: {
                password: {
                    value: '',
                    state: false
                },
                repassword: {
                    value: '',
                    state: false
                },

            }
        }
        console.log(props)
        this.default = this.state.config
    }

    componentDidMount() {

    }

    reset = async () => {
        this.setState({ loader: true, invalid: true });
        let cred = {
            password: this.state.config.password.value,
            hash_code: this.props.hash

        }
        let response = await apiClient.sendPost('/api/reset', cred)

        await this.activity.formend(response);
    }
    render() {
        return (
            <>
                <div className="login-container">
                    <Toast

                        show={this.state.toast.show ? "show" : ''}
                        color={this.state.toast.color}
                        title={this.state.toast.title}
                        message={this.state.toast.message}
                        cleanToast={this.activity.cleanToast}
                    />
                    <h4><strong> Reset Password</strong></h4>
                    <hr></hr>
                    <form className="form" >
                        <InputText
                            type="password"
                            id="password"
                            label="New Password"
                            value={this.state.config.password.value}
                            getValues={this.activity.getValues}
                            constraint={{ required: true, min: 8 }}
                            reset={this.state.reset}
                        />

                        <InputText
                            type="password"
                            id="repassword"
                            label="Re-Type Password"
                            value={this.state.config.repassword.value}
                            getValues={this.activity.getValues}
                            mainpassword={this.state.config.password.value}
                            constraint={{ required: true, min: 8, repassword: true }}
                            reset={this.state.reset}
                        />
                        <button onClick={(e) => { e.preventDefault(); this.reset() }} className="bbhf_btn bbhf_btn_green" disabled={this.activity.inputState() || this.state.invalid}>
                            {this.state.loader ? <span style={{ display: "flex" }}><Loader />Processing</span> :
                                "Reset Password"}</button>



                    </form>
                    <div className="fp-holder">
                        <a href="/dashboard/login" ><i className="fa fa-arrow-left"> </i>login </a>

                    </div>

                </div>
            </>
        )
    }
}

if (document.getElementById('reset')) {
    var hash = document.getElementById('reset').getAttribute('hash')
    ReactDom.render(<Reset hash={hash} />, document.getElementById('reset'));
}