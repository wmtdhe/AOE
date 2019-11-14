import React from 'react';
import SearchBar from "./searchBar";
import '../css/header.css'

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            signedIn:false
        }

    }

    render() {
        return(
            <div className='header'>
                <div className='main-logo'><a href="/"><span>Recipes</span></a></div>
                <SearchBar/>
                    <div className='log-section'>
                        <a href="/user/signup">Sign up</a>
                        <a href="/user/signin">Sign In</a>
                    </div>


            </div>
        )
    }
}
export default Header;