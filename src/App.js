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
    }, 100) //can make really fast if needed...
  }
  const detect = async (detector) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
      ) 
    {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const hands = await detector.estimateHands(video)
      //if it doesn't detect a hand, it should reset the count and handStates
      if(hands.length > 0){
        //iterate over each hand
        //add to count whenever hands are present
        count += 1;
        console.log('count:', count)
        for(let hand of hands){
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
        }
      }

      if(count >= 20){
        const GE = new fp.GestureEstimator([
          zeroGesture,
          oneGesture,
          twoGesture,
          threeGesture,
          fourGesture,
          fiveGesture,
          equalsGesture
        ])
        const gestures = handStates.map((landmark) => {
          const gesture = GE.estimate(landmark, 4) //revert to 4
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
        //gestures collected
        console.log('CountGestures: ', gestures)
        //figure out if gesture is with two hands or 
        const maxGesture = getMode(gestures)
        //gets other max
        let otherGesture;
        let maxCount = 0;
        if(gestures.length > 25){
          let otherGesture = getMode(gestures.filter(n => {  
            if(n == maxGesture){
              maxCount += 1;
              if(maxCount < 20){
                return false
              }
            }else{
              return true
            };
          }));
        }
        // EXECUTING ACTIONS

        //equals present
        if(maxGesture == 'equals' || otherGesture == 'equals'){
          equals()
        }else{
          let total = 0;
          if(typeof otherGesture == 'undefined'){
            total += maxGesture
          }else{
            total += (maxGesture + otherGesture)
          }
          const comps = data['comps']
          if(comps.length === 0){
            comps.push(total.toString())
          }else{
            comps[comps.length - 1] = comps[comps.length - 1] + total.toString()
          }
          setData({comps: comps})
        }
        //reset everything
        handStates.length = 0
        count = 0
      }
    }
  }

  const getMode = (arr) => {
    let maxcount = 0;
    let element_having_max_freq;
    for (let i = 0; i < arr.length; i++) {
        let count = 0;
        for (let j = 0; j < arr.length; j++) {
            if (arr[i] === arr[j])
                count++;
        }
        if (count > maxcount) {
            maxcount = count;
            element_having_max_freq = arr[i];
        }
    }
    return element_having_max_freq;
}
  const add = () => {
    const comps = data['comps']
    comps[comps.length - 1] = comps[comps.length - 1] + '+'
    setData({comps: comps})
  }
  const subtract = () => {
    const comps = data['comps']
    comps[comps.length - 1] = comps[comps.length - 1] + '-'
    setData({comps: comps})
  }
  const multiply = () => {
    const comps = data['comps']
    comps[comps.length - 1] = comps[comps.length - 1] + '*'
    setData({comps: comps})
  }
  const divide = () => {
    const comps = data['comps']
    comps[comps.length - 1] = comps[comps.length - 1] + '/'
    setData({comps: comps})
  }


  const equals = () => {
    const comps = data['comps']
    const tot = eval(comps[comps.length - 1])
    comps.push(tot.toString())
    setData({comps: comps})
  }


  useEffect(()=>{guessHands()},[]);
  // guessHands()

  const findOperator = () => {
    const operators = ['add', 'subtract', 'multiply', 'divide', 'clear']
    return null
  }

  const findMode = (lst) =>{
    const vals = {
      0:0,
      1:0,
      2:0,
      3:0,
      4:0,
      5:0,
      'equals':0
    }
    for(let num of lst){
      vals[num] += 1
    }
    return 
  }





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
      <button onClick={add}>Add</button>
      <button onClick={subtract}>Subtract</button>
      <button onClick={multiply}>Multiply</button>
      <button onClick={divide}>Divide</button>
      <button onClick={equals}>Equals</button>


      <h1 className="title-text">Sign Calc</h1>
      <p className="explanation">Use your fingers and hand motions to perform computations</p>
      </header>
    </div>
  );
}

export default App;

