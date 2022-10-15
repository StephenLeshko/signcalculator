// Import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const threeGesture = new GestureDescription(3); 

// Thumb 
threeGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.75)
threeGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.75)

// Index
threeGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)

//Middle
threeGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0); 

//Ring
threeGesture.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0); 

// Pinky
threeGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 0.90)
