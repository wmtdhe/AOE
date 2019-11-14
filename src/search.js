import React from 'react';
import "./css/search.css";
import logo from './logo.svg';
import SearchBar from "./comps/searchBar";
import Header from "./comps/Header";
import './css/background.css';

function Result(props) {
    return(
        <li>
            <div><a href={`/recipe?id=${props.food.id}`}><img src={`/avatar/${props.food.id}`} alt=""/></a></div>
            <div>
                <a href={`/recipe?id=${props.food.id}`}>{props.food.name}</a>
                <p>{props.food.description}</p>
            </div>
        </li>
    )
}

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state={
            results:[],
            relevantDefault:[],
            // check:`checked`
        };
        //bind context to these functions
        this.callBackendAPI=this.callBackendAPI.bind(this);
        this.relevantSort=this.relevantSort.bind(this);
        this.highestSort=this.highestSort.bind(this);
        this.quickSort=this.quickSort.bind(this);
        this.latestSort=this.latestSort.bind(this);
    }
    componentDidMount() {
        //setup state here
        //this setup below might see ReactApp as title when documents are still loading
        document.title = 'Search Results for '+this.props.location.search.slice(9);
        // console.log(this.props.location.search)
        let search = this.props.location.search;
        this.callBackendAPI(search).then(res=>{
            console.log(res);
            this.setState({
                results:res,
                relevantDefault:res
            })

        }).catch(err=>{
            console.log(err)
        })
    }

    //https://github.com/mysqljs/mysql/blob/master/Readme.md#pooling-connections
    //async function
    //await
    async callBackendAPI(search){
        console.log('--------here');
        const response = await fetch('http://localhost:5000/search'+search);
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message, 'me saying')
        }
        return body;
    };
    /**---------- DEEP COPY ARRAY!!!!!!-----------------**/
    /**
     * sort in client side
     * implemented another method in server side
     */
    relevantSort(){
        console.log('relevant triggered');
        // this.setState({results:this.state.relevantDefault});
        console.log(this.state.relevantDefault)
        //probably will count the occurrence of keywords in description, title, ingredient section
        let relevant = this.state.results;
        // let times=new Array(relevant.length).fill(0);
        let key = 'chicken';
        relevant.forEach(function (element) {
            // console.log(element.name)
            element['count']=0;
            //let index=0//starting point
            // 1. check name
            let index = 0;
            while(index<element.name.length){
                index=element.name.toLocaleLowerCase().indexOf(key,index);
                if(index<0){
                    index=0
                    break;
                }
                else{
                    index=index+key.length;
                    element.count++;
                }
            }

            //2. check description
            while(index<element.description.length){
                index=element.description.toLocaleLowerCase().indexOf(key,index);
                if(index<0){
                    index=0
                    break;
                }
                else{
                    index=index+key.length;
                    element.count++;
                }
            }
            //3. check ingredients
            while(index<element.ingredients.length){

                index=element.ingredients.toLocaleLowerCase().indexOf(key,index);
                if(index<0){
                    index=0
                    break;
                }
                else{
                    index=index+key.length;
                    element.count++;
                }

            }
        });
        relevant.sort((a,b)=>{
            if(a.count<b.count){return 1}
            else if(a.count>b.count){return -1}
        });
        let arr = this.state.relevantDefault.map(value=>value)
        this.setState({results:arr})
        console.log(relevant);

    }
    highestSort(){
        console.log('highest triggered');
        //if we dont bind the function in constructor, we'll lost the context -- result in undefined
        console.log(this)

    }
    latestSort(){
        console.log('latest triggered')
        let latest = this.state.results.map(value=>value)
        latest.sort(function (a,b) {
            if(a.created_date>b.created_date){return -1}
            else if(a.created_date<b.created_date){return 1}
        })
        this.setState({results:latest});
    }
    quickSort(){
        console.log('quick triggered')
        let quick = this.state.results.map(value=>value)
        quick.sort(function (a,b) {
            if(a.cooktime>b.cooktime){return 1}
            else if(a.cooktime<b.cooktime){return -1}
        })
        this.setState({
            results:quick,
        });
        console.log('in quick --')
        console.log(this.state.relevantDefault)
    }
    render(){
        // let food = [{name:'pie',description:"so-so",id:1},{name:'eggplant',description:'haikeyi',id:2},{name:'eggplant',description:'haikeyi',id:1},{name:'eggplant',description:'haikeyi',id:1},{name:'eggplant',description:'haikeyi',id:1},{name:'egg',description:'bad',id:1}];
        let foodList = this.state.results.map((food,index)=>(
            <Result key={index} food={food}/>
        ));
        return(
            <div>
                <Header/>
                <div className='main-container-search'>

                    <div className='left-result'>
                        {
                            foodList.length>0?(<ul>
                                {foodList}
                            </ul>):(<div>
                                No result found
                            </div>)
                        }

                    </div>
                    <div className='right-sort'>
                        <form action="">
                            <input type="radio" name='sort' onClick={this.relevantSort} />Most Relevant<br/>
                            <input type="radio" name='sort' onClick={this.highestSort} />Highest Rated<br/>
                            <input type="radio" name='sort' onClick={this.latestSort}/>Latest Added<br/>
                            <input type="radio" name='sort' onClick={this.quickSort}/>Quickest
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default Search;