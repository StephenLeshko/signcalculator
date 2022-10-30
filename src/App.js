import logo from './logo.svg';
//imports
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import Webcam from "react-webcam";
import './App.css';
import NumScreen from "./NumScreen"

import * as fp from "fingerpose";

//import gestures
import {zeroGesture} from "./gestures/zero";
import {oneGesture} from "./gestures/one";
import {twoGesture} from "./gestures/two";
import {threeGesture} from "./gestures/three";
import {fourGesture} from "./gestures/four";
import {fiveGesture} from "./gestures/five";
import {equalsGesture} from "./gestures/equals";




function App() {

  const webcamRef = useRef(null);
  const numScreenRef = useRef(null);
  // const canvasRef = useRef(null); 
  // const [comp, setComp] = useState('');
  const [data, setData] = useState({comps: []})
  
  let count = 0; //stores the amount of times a gesture has been seen
  let handStates = [] //stores the landmark info; gets cleared when count reverts to zero
  //when count is at last value, it runs a function on the handStates
  //function checks to see what kind of movement is going on...
  //After this happens, count is changed, screen state is updated
  


  //creating detector
  

  const guessHands = async () => {
    const model = handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
      runtime: 'tfjs', 
      modelType: 'full'
    };
    const detector = await handPoseDetection.createDetector(model, detectorConfig);
    console.log('Beginning Detection')
    setInterval(() => {
      detect(detector)
    }, 1000)
  }
  const detect = async (detector) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      // canvasRef.current.width = videoWidth;
      // canvasRef.current.height = videoHeight;
      const hands = await detector.estimateHands(video)
      if(hands.length > 0){
        //iterate over each hand
        // console.log(hands)
        let total = null
        for(let hand of hands){
          // console.log(hand)
          // console.log('Getting gestures..')
          const GE = new fp.GestureEstimator([
            zeroGesture,
            oneGesture,
            twoGesture,
            threeGesture,
            fourGesture,
            fiveGesture,
            equalsGesture
          ])

          //convert the keypoints to 'landmarks'
          const landmarks = []
          const wristZ = hand.keypoints3D[0].z
          for(let i = 0; i < 21; i++){
            let arr = []
            arr.push(hand.keypoints[i].x)
            arr.push(hand.keypoints[i].y)
            let dif = hand.keypoints3D[i].z - wristZ
            arr.push(dif)
            landmarks.push(arr)
          }

          handStates.push(landmarks);
          count += 1;
          
          if(count >=5){
            const gestures = handStates.map((landmark) => {
              const gesture = GE.estimate(landmark, 4)
              console.log(gesture)
              if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
                  const confidence = gesture.gestures.map(
                    (prediction) => prediction.score
                  );
                  const maxConfidence = confidence.indexOf(
                    Math.max.apply(null, confidence)
                  ); 
                  return gesture.gestures[maxConfidence].name
  
              }  
            })
            console.log(gestures)
            handStates.length = 0
            count = 0
          }



          // --------------OLD DETECTION CODE---------------

          // const gesture = await GE.estimate(landmarks, 4);
          // // console.log('Gesture: ')
          // // console.log(gesture)
          // if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
  
          //   const confidence = gesture.gestures.map(
          //     (prediction) => prediction.score
          //   );
          //   const maxConfidence = confidence.indexOf(
          //     Math.max.apply(null, confidence)
          //   ); //gets the index of the gesture with the max certainty
          //   // console.log(gesture.gestures[maxConfidence].name)


          //   //This is where the math can happen... 
          //   if(total === null){
          //     total = gesture.gestures[maxConfidence].name
          //   }else{
          //     total += gesture.gestures[maxConfidence].name
          //   }

          // }
        }

        //setting
        if(total != null){
          console.log('Total: ' + String(total))
          
          const comps = data['comps']
          // console.log('Comps' + comps)
          if(comps.length === 0){
            comps.push(total.toString())
          }else if(comps[comps.length - 1].length > 30){
            comps.push(total.toString())
          }else{
            comps[comps.length - 1] = comps[comps.length - 1] + total.toString()
          }

          setData({comps: comps})
          // setComp((value) => {
          //   return value + total.toString();
          // })
        }
      }
    }
  }
  useEffect(()=>{guessHands()},[]);

  // guessHands()


  /*        RETURN VALUE         */
  return (
    <div className="App">
      <header className="App-header">
      <div className="line">
        <Webcam
            ref={webcamRef}
            mirrored={true}
            className='cam elm-border'
        />
        <NumScreen className="elm-border" comps={data['comps']}/>
      </div>
      <h1 className="title-text">Sign Calc</h1>
      <p className="explanation">Use your fingers and hand motions to perform computations</p>
      </header>
    </div>
  );
}

export default App;
