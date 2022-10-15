// Import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const fiveGesture = new GestureDescription(5); 

// Thumb 
fiveGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)

// Index
fiveGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)

//Middle
fiveGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0); 

//Ring
fiveGesture.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0); 

// Pinky
fiveGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
