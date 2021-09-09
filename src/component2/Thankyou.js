import React ,{useContext}from 'react'
import YouTube from 'react-youtube';
import getVideoId from 'get-video-id';
import { CoreContext } from '../context/core-context';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const Thankyou = () => {
    const coreContext = useContext(CoreContext);
    const { id } = getVideoId('https://www.youtube.com/watch?v=WYrl74Vg-Ro');
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        }
    }
  //  let sahil=coreContext.result[1].data.error
    console.log("hankyu",coreContext.result)
    return (
        <>
        <div className="container"style={{color:"rgb(0, 117, 178)" ,marginTop:"10vh",width:"100%"}}>
            <h1 style={{marginBottom:"2vh"}}><strong>Thank You! For filling Out The COVID-19 Patient Intake Form.{(coreContext.result!==undefined)?coreContext.result[1].data:null}</strong></h1>
            <hr/>
            <center><h3 style={{color:'black' }}> Please follow the Steps below</h3>
            <YouTube videoId={id} opts={opts}  />
            </center>
        </div>
        <div style={{backgroundColor:"#4287f5",color:'white'}}>
            <p style={{marginLeft:"150px",marginRight:"150px" ,fontSize:"23px"}}><span style={{fontSize: "36px",fontWeight: "700"}}><strong>Step #1. Results via Patient Portal...</strong></span><br/>
We will also email you a link to activate your Patient Portal, which will give you permanent access to your results after speaking with a Provider within 12 hours.
Please check your email today and follow the instructions to verify your information.</p>
        </div>
        <footer className="page-footer font-small " style={{backgroundColor:"black",color:"white"}}>
        <div  className="row" style={{minHeight:"20vh",paddingTop:"7vh"}}>
            <div className="col-md-4">
            <h1 style={{marginLeft:"70px"}}><b>Let's Connect</b></h1>
            </div>
            <div className="col-md-2"> <a type="button" href ="https://www.facebook.com/DiabetesNOMORE101/" target="_blank" className="btn btn-outline-light"  style={{width:"70%",fontWeight:"700", border:"2px solid white"}}>Facebook <FacebookIcon></FacebookIcon></a></div>
            <div className="col-md-2"> <a type="button"href ="https://www.instagram.com/dr_annex_luberisse/" target="_blank" className="btn btn-outline-light" style={{width:"70%" ,fontWeight:"700", border:"2px solid white"}}>Instagram<InstagramIcon></InstagramIcon></a></div>
            <div className="col-md-2"> <a type="button" href ="https://twitter.com/Annex_Lubiresse" target="_blank" className="btn btn-outline-light" style={{width:"70%" ,fontWeight:"700", border:"2px solid white"}}>Twitter<TwitterIcon></TwitterIcon></a></div>
            
  
        </div>
        </footer>
        </>
    )
}

export default Thankyou
