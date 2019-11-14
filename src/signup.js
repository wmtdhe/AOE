import React from 'react';
import Header from "./comps/Header";
import './css/signup.css';

function DuplicatePop(props) {
    return(
            <div className='alert' style={{display:props.show?"block":"none"}}>
                This email has already existed
            </div>

    )
}
function Requirement(props){
    return(
        <li style={{color:props.style}}>{`* ${props.value}`}</li>
    )
}
function PopOut(props) {
    let requirements = [{criterion:'length between 8 and 16',checks:props.size}, {criterion:'contain 1 capital letter',checks:props.upper}]
    return(
        <div style={{display:props.show?"block":"none"}} className='popout'>
        <ul>
            {
                requirements.map((item,index)=><Requirement value={item.criterion} style={item.checks} key={index}/>)
            }
        </ul>
        </div>
    )
}
class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:false,
            upper:'red',
            size:'red',
            duplicate:false,

        };
        this.handleInput = this.handleInput.bind(this)
        this.handleFocus = this.handleFocus.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.callBackendAPI = this.callBackendAPI.bind(this)
    }
    componentDidMount() {
        document.title='Sign Up'

    }

    handleSubmit(e){
        if(this.state.upper!='green'||this.state.size!='green'){
            this.setState({
                show:true
            })
            e.preventDefault();
            // window.history.back()
        }
        else{

            // email:e.target.childNodes[0].childNodes[1].childNodes[0].value

            return true;
        }
    }
    handleBlur(e){
        this.setState({show:false})
    }
    handleFocus(e){
        this.setState({
            show:true
        })
    }
    handleFocus(e){
        this.setState({
            show:true
        })
    }
    handleInput(e){
        // length 8-16, one capital,
        console.log(e.target.value)
        let input = e.target.value;
        let template = /\w*[A-Z]\w*/;
        //check letter case
        if(/[A-Z]/.test(input)){
            this.setState({
                upper:'green'
            })
        }else{
            this.setState({
                upper:'red'
            })
        }
        //check length
        (/\w{8,}/.test(input))?this.setState({
                size:'green'
            }):this.setState({
            size:'red'
        });
        console.log(/\w{8,}/.test(input))
    }
    async callBackendAPI(){
        const response = await fetch(
            'http://localhost:5000/user/signup',
            {
                method:'POST',
                body:{email:'yaoyhand@sina.cn',pass:'sads'}
            }
            );
        const body = await response;
        console.log(body)
        return body.status
    };
    render(){
        return(
            <div>
                <Header/>
                <div className='main-container'>

                    <div className='signup'>
                        <DuplicatePop show={this.state.duplicate}/>
                        <div className='form'>
                            <form action='' method='post' onSubmit={this.handleSubmit}>
                                <fieldset>
                                    <h1>Sign Up</h1>
                                    <div><input type="email" name='email' required placeholder='Email'/></div>
                                    <div><input type="password" placeholder='Password' required maxLength='16' minLength='8' name='pass' onInput={this.handleInput} onFocus={this.handleFocus} onBlur={this.handleBlur}/></div>
                                    <div><input type="submit" value="Sign Up" id='signup'/></div>
                                </fieldset>
                            </form>
                        </div>
                        <PopOut show={this.state.show} upper={this.state.upper} size={this.state.size}/>
                    </div>
                </div>
            </div>
        )
    }
}


export default SignUp;