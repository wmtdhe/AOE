import React,{Component} from 'react';
import '../css/slideImage.css';
import posed from 'react-pose';
import {Animate} from "react-move";
import { easeExpOut } from 'd3-ease';

const Box = posed.div({
    visible:{opacity:1},
    hidden:{opacity: 0}
})

// class Demo extends Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             isVisible:true,
//         }
//     }
//     componentDidMount() {
//         setInterval(()=>{
//             this.setState({isVisible:this.state.isVisible?false:true})
//         },1000)
//     }
//
//     render(){
//         return <Box className='box'
//                     pose={this.state.isVisible ? 'visible' : 'hidden'}/>
//     }
// }
function ListItem(props) {
    return(<li>
        <a href={`/recipe?id=${props.id}`}>
            <img src={`/avatar/${props.id}`} alt=""/>
        </a>
    </li>)
}

class SlideImage extends Component{
    constructor(props){
        super(props);
        //bind function to refer this to the component
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            defaultImg:0,
            open:true,
        }
    }
    //handle slides of image - where to go
    handleChange(e) {
        let direction = e.target.className;
        let length = this.props.imageList.length;
        console.log(length)
        if(direction==='prev'){
            if(this.state.defaultImg===0){this.setState({defaultImg:-length+1})}
            else{
                this.setState({defaultImg:this.state.defaultImg+1});
            }
        }
        else{
            if(this.state.defaultImg===-length+1){this.setState({defaultImg:0})}
            else{
                this.setState({defaultImg:this.state.defaultImg-1});
            }
        }
    }
    //------in Animate update state ---> return state result should be an array --> for
    render(){
        let imageList = this.props.imageList; // [{imgurl, id}]
        return (
            <div className='outer-frame'>
                <a className='prev' href="#" onClick={this.handleChange}><div className='left'></div></a>
                <Animate start={()=>({shift:this.state.defaultImg*35})}
                         update={()=>({shift:[this.state.defaultImg*35], timing: { duration: 1000, ease: easeExpOut }})}
                >
                    {
                        (shift)=>{
                            // console.log('im here',shift.shift)
                            return(
                                <ul value={shift} style={{
                                    position:'absolute',
                                    WebkitTransform: `translate(${shift.shift}em, 0)`,
                                    transform: `translate(${shift.shift}em, 0)`,
                                }}>
                                    {imageList.map((image,index)=><ListItem key={index} id={image.id} url={image.url}></ListItem>)}
                                </ul>
                            )
                        }
                    }
                </Animate>
                <a className='next' href="#" onClick={this.handleChange}><div className='right'></div></a>
            </div>

        )
    }
}
// export default Demo;
export default SlideImage;
