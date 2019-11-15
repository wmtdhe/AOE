import React from 'react';
import './css/recipe.css';
import Header from './comps/Header';
import './css/background.css';

//for method and ingredients
function Step(props) {
    return(<li>
        {`${props.id+1}. `} {props.step}
    </li>)
}
function Steps(props) {
    let steps = props.steps;
    let stepList = steps.map((step,index)=>(<Step key={index} step={step} id={index}/>))
    return(
        <ul>
            {stepList}
        </ul>
    )
}
//for nutrition table
function Nutrient(props){
    //props.nutrients [{name,value},{}]
    let nutrientList = props.nutrients;
    let nutrients = nutrientList.map((nutrient,index)=>(<li key={index}>
        <span>{nutrient.cat}</span>
        <span>{nutrient.value}</span>
    </li>));
    return(<ul className={props.className}>
        {nutrients}
    </ul>)
}


class Recipe extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            data:null,
            id:'',
            name:'',
            intro:'',
            steps:[],
            ingredients:[],
            nutrients:[],
            comments:[],
            count:7,
            current_page:0,
        }
        this.renderPageBox=this.renderPageBox.bind(this)
        this.handlePage=this.handlePage.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }


    // load recipe from backend
    // React Router passes along a few objects in props: history, match, and location
    componentDidMount() {
        // console.log('aa-------',this.props.location);
        // this.getQuery();
        let search = this.props.location.search;
        let url = 'http://localhost:5000/recipe'+search
        this.callBackendAPI(url)
            .then(res => {
                this.setState({ data: res });
                // console.log('im data',this.state.data)
                // nutrients list here
                let nutrientList = [{cat:'calories',value:this.state.data.calories},
                    {cat:'protein',value:this.state.data.protein},
                    {cat:'carbs',value:this.state.data.carbs},
                    {cat:'lipid',value:this.state.data.lipid},
                    {cat:'sodium',value:this.state.data.sodium}];
                this.setState({
                    steps:this.state.data.steps.split('$'),
                    ingredients:this.state.data.ingredients.split('$'),
                    intro:this.state.data.description,
                    name: this.state.data.name,
                    id:this.state.data.id,
                    nutrients:nutrientList,
                    count:this.state.data.count,
                    current_page:this.state.data.count>0?1:0
                }
                );
                //React-helmet
                document.title = this.state.name;
                //initial comments
                let commentUrl = `http://localhost:5000/recipe/comments?page=1&cid=${this.state.id}`
                this.callBackendAPI(commentUrl).then(res=>this.setState({comments:res})).catch(err=>console.log(err))
            })
            .catch(err => console.log(err,' my fault'));


    }

    async callBackendAPI(url){

        // console.log('--------here')
        const response = await fetch(url);
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    getQuery(){
        let search = this.props.location.search;
        let queries = search.split('?')[1].split('&').map(i=>{
            let arr = i.split('=');
            let obj = {}
            obj[arr[0]] = arr[1]
            // console.log(obj)
            return(obj);
        });
        console.log(queries);
    };
    //-----page navigation box
    renderPageBox(){
        let pages=Math.ceil(this.state.count/5)
        let temp=pages?new Array(pages).fill(0):[]
        return(
            <div className='comment-nav'>
                <div onClick={(e)=>this.handlePage(e,this.state.current_page-1)}>Prev</div>
                <ul>
                    {
                        temp.map((v,index)=><li key={index+1} className={this.state.current_page==(index+1)?('active'):('')} onClick={(e)=>(this.handlePage(e,index+1))}>
                            {index+1}
                        </li>)
                    }
                </ul>
                <div onClick={(e)=>this.handlePage(e,this.state.current_page+1)}>Next</div>
            </div>
        )
    }
    handlePage(e,page){
        let pages=Math.ceil(this.state.count/5)
        if(page==0 || page==(pages+1)){return;}
        this.setState({current_page:page})
        let url =`http://localhost:5000/recipe/comments?page=${page}&cid=${this.state.id}`
        this.callBackendAPI(url)
            .then(res=>{
                console.log(res)
                this.setState({
                    comments:res
                })
            })
            .catch(err=>console.log(err))
    }

    /**
     * {"id":1,"name":"Mexican chicken burger","description":"Ready in under 20 minutes, this burger with spiced chipotle chicken breast, in toasted brioche with guacamole, makes for a satisfying weeknight treat for one","cooktime":8,"steps":"Put the chicken breast between two pieces of cling film and bash with a rolling pin or pan to about 1cm thick. Mix the chipotle paste with half the lime juice and spread over the chicken.$Heat a griddle pan over a high heat. Once hot, cook the chicken for 3 mins each side until cooked through, adding the cheese for the final 2 mins of cooking. Add the bun, cut-side down, to the griddle pan to toast lightly. Season the chicken.$Meanwhile, mash the avocado with the remaining lime juice. Stir in the cherry tomatoes, jalapeño and garlic, and season with a little salt. Spread over the base of the bun, then add the chicken followed by the top of the bun.","ingredients":"1 chicken breast\r\n$1 tsp chipotle paste\r\n$1 lime, juiced\r\n$1-2 slices cheese\r\n$1 brioche bun, split\r\n$½ avocado\r\n$2 cherry tomatoes, chopped\r\n$3-4 pickled jalapeño slices, chopped\r\n$½ small garlic clove, finely grated"}
     * @returns {*}
     * <img src> --- proxy to port 5000
     */
    render(){
        return(
            <div>
                <Header/>
                <div className='main-container'>
                    <div className='top'>
                        <div className='img-preview'><img src={`/avatar/${this.state.id}`} alt=""/></div>
                        <div className='content-preview'>
                            <h1>{this.state.name}</h1>
                            <div className='intro'>
                                <p>{this.state.intro}</p>
                            </div>
                            <div className='description'>
                                <Nutrient className='nutrient' nutrients={this.state.nutrients}/>
                            </div>
                        </div>
                    </div>
                    <div className='bot'>
                        <div className='specific'>
                            <div className='ingredient'>
                                <h1>Ingredients</h1>
                                <Steps steps={this.state.ingredients}/>
                            </div>
                            <div className='steps'>
                                <h1>Method</h1>
                                <Steps steps={this.state.steps}/>
                            </div>
                        </div>
                        <div className='side-menu'>side menu</div>
                    </div>
                    <div className='comment-section'>
                        <h1>Comments</h1>
                        <Comments comments={this.state.comments}/>
                        {this.renderPageBox()}
                    </div>
                </div>

            </div>
        )
    }
}

function Comments(props) {
    let comments = props.comments
    return(
        <div className='comments'>
            <ul>
                {
                    comments.map((comment,index)=><li key={index}>
                        {comment.content}
                    </li>)
                }
            </ul>
        </div>
    )
}
//<Route path={`/recipe/comments`} component={this.renderComments()}/>
export default Recipe;