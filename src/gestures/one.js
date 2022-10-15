// Import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const oneGesture = new GestureDescription(1); 

// Thumb 
oneGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1)

// Index
oneGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 0.90)
oneGesture.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.10)

//Middle
oneGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 0.90); 

//Ring
oneGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 0.75); 

// Pinky
oneGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 0.75)
