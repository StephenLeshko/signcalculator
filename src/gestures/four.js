// Import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const fourGesture = new GestureDescription(4); 

// Thumb 
fourGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1)

// Index
fourGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)

//Middle
fourGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0); 

//Ring
fourGesture.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0); 

// Pinky
fourGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
