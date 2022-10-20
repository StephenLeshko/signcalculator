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




function App() {

  const webcamRef = useRef(null);
  // const canvasRef = useRef(null); 
  const [comp, setComp] = useState('');

  const [data, setData] = useState({comps: []})
  //creating detector
  

  const guessHands = async () => {
    const model = handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
      runtime: 'tfjs', // or 'tfjs'
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
            fiveGesture
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

          const gesture = await GE.estimate(landmarks, 4);
          // console.log('Gesture: ')
          // console.log(gesture.poseData)
          if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
  
            const confidence = gesture.gestures.map(
              (prediction) => prediction.score
            );
            const maxConfidence = confidence.indexOf(
              Math.max.apply(null, confidence)
            );
            // console.log(gesture.gestures[maxConfidence].name)
            if(total === null){
              total = gesture.gestures[maxConfidence].name
            }else{
              total += gesture.gestures[maxConfidence].name
            }

          }
        }
        if(total != null){
          console.log('Total: ' + String(total))
          console.log('Digit:' + comp)
          setComp((value) => {
            return value + total.toString();
          })
        }
      }
    }
  }
  useEffect(()=>{guessHands()},[]);




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
        <NumScreen className="elm-border"comp={comp}/>
      </div>
      <h1 className="title-text">Sign Calc</h1>
      <p className="explanation">Use your fingers and hand motions to perform computations</p>
      </header>
    </div>
  );
}

export default App;
