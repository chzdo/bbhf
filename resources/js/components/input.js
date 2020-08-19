import React from 'react';


export default class InputText extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

            helperhidden: true,
            errorMessages: '',
            value: '',
            constraint: this.props.constraint,
        }
        this.validate = this.validate.bind(this)
    }
componentDidUpdate(prevprops,prevstate){
   
}
    validate(value) {

        var constraint = this.state.constraint;

        if (constraint.required && value.length == 0) {
            this.setState({ 'errorMessages': "This Field is Required", "helperhidden": false })

            return false;
        }
        var reg = /^\w+\s\w+$/
        if (constraint.name && !reg.test(value)) {
            this.setState({ 'errorMessages': "Enter First and Last name", "helperhidden": false })

            return false;
        }
        if (constraint.max && value.length > constraint.max) {
            this.setState({ 'errorMessages': "The Required max length is " + constraint.max, "helperhidden": false })
            return false;
        }
        if (constraint.min && value.length < constraint.min) {
            this.setState({ 'errorMessages': "The Required min length is " + constraint.min, "helperhidden": false })
            return false;
        }
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (constraint.email && !re.test(value)) {
            this.setState({ 'errorMessages': "Enter a Valid email ", "helperhidden": false })
            return false;
        }
        const num = /^(0|[1-9]\d*)(\.\d+)?$/
        if (constraint.number && !num.test(value)) {
            this.setState({ 'errorMessages': "Enter a Valid Number ", "helperhidden": false })
            return false;
        }
        if (constraint.number && parseFloat(value) > parseFloat(constraint.max)) {
            this.setState({ 'errorMessages': "Enter maximum number is  " + constraint.max, "helperhidden": false })
            return false;
        }
        if (constraint.number && parseFloat(value) < parseFloat(constraint.min)) {
            this.setState({ 'errorMessages': "Enter maximum number is  " + constraint.min, "helperhidden": false })
            return false;
        }
        this.setState({ 'errorMessages': "", "helperhidden": true })
        return true;
    }



    componentDidMount() {
        //this.props.onRef(this)

        this.setState({ constraint: this.props.constraint });

    }

    render() {


        return <>
            <div className="form_group">
                <div className="bbhf_input_holder">

                    <input
                        id={this.props.id}
                        type={this.props.type}
                        max={this.props.max}
                        min={this.props.min}
                        minLength={this.props.minLength}
                        value = {this.props.value}
                        maxLength={this.props.maxLength}
                        step={this.props.step}
                        onChange={(e) => {
                                    
                            this.props.getValues(e, this.validate(e.target.value))

                        }
                        
                        }
                        className="bbhf_input "
                        placeholder={this.props.label} />
                    <span className="bbhf_input_label">
                        {this.props.label}
                    </span>

                </div>
                {!this.state.helperhidden ?
                    <span className="invalid" id=""  >
                        <span>{this.state.errorMessages}</span> <span className="fa fa-times "></span>
                    </span> : ""
                }
            </div>
        </>
    }
}

export class SelectInput extends React.Component {

    constructor(props) {
        super(props)
     
        this.state = {
            data:[],
            helperhidden: true,
            errorMessages: '',
            value: '',
            constraint: this.props.constraint,
            selected:[]
        }

    }

componentDidMount(){

}
    render() {
        return (
            <>
                <div className="form_group">
                    <div className="bbhf_input_holder">
                        <select
                            value = {this.props.value}
                            id={this.props.id}
                            className="bbhf_input"
                            onChange={(e) => {
                           
                                 var state = e.target.value != ''
                               
                                    this.props.getValues(e,state)
                                      
                                                        
                                   this.setState({ 'errorMessages': "Enter a Valid Value", "helperhidden": state});
                               
                            
                            }
                        }
                        >
                            <option value=''>-Select-</option>
                            {this.props.data != null ? this.props.data.map((data, i) => 
                          { let {value} =  this.props.valueKeys;
                          let {label} =  this.props.valueKeys;                            
                                 return  <option key={i} value={data[value]}  >{data[label]}</option>
                          }) : null
                                                         }
                        </select>
                        <span className="bbhf_input_label">
                            {this.props.label}
                            {
                            this.props.isLoading?
                        <span className="fa fa-spinner fa-spin"></span>:null
                        }
                        </span>
                      
                    </div>
                    {!this.state.helperhidden ?
                        <span className="invalid" id=""  >
                            <span>{this.state.errorMessages}</span> <span className="fa fa-times "></span>
                        </span> : ""
                    }
                </div>
            </>
        )
    }
}
