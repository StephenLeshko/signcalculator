// Import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const twoGesture = new GestureDescription(2); 

// Thumb 
twoGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.75)
twoGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.75)

// Index
twoGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)

//Middle
twoGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0); 

//Ring
twoGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 0.75); 

// Pinky
twoGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 0.75)
