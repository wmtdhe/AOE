import React from 'react';
import SlideImage from "./comps/slideImage";
import logo from './logo.svg';
import SearchBar from "./comps/searchBar";
import Header from "./comps/Header";
import './css/background.css';



class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        let imageList = [{id:1, url:logo},{id:2, url:logo},{id:3,url:logo}];
        return (
            <div>
                <Header/>
                <div className='main-container'>
                    <SlideImage imageList={imageList}/>
                </div>
            </div>

        );
    }

}

export default Home;