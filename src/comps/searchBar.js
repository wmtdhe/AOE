import React from 'react';
import '../css/searchBar.css';

//get search results here
class SearchBar extends React.Component{
    constructor(props){
        //call parent constructor
        super(props);
        // this.changeD = this.changeD.bind(this)
        this.state={
            keyword:this.props.value,
        }
    }

    render() {
        return(
            <div className='search-bar'>
                <form action="/search" method='get' >
                    <input type="search" placeholder='dish, ingredients...' name='keyword' />
                    <input type="submit" value='Search'/>
                </form>
            </div>
        )
    }
}


export default SearchBar;