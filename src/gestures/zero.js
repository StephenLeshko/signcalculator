// Import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const zeroGesture = new GestureDescription(0); 

// Thumb 
zeroGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1)

// Index
zeroGesture.addCurl(Finger.Index, FingerCurl.HalfCurl, 1); 
zeroGesture.addCurl(Finger.Index, FingerCurl.FullCurl, 0.25); 

//Middle
zeroGesture.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1); 
zeroGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 0.25); 

//Ring
zeroGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 1); 
zeroGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 0.25); 

// Pinky
zeroGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 0.75); 
zeroGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 0.25); 
