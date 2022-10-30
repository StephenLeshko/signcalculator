// Import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const equalsGesture = new GestureDescription(7); 

// Thumb 
equalsGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.6)
equalsGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.5)

// Index
equalsGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 0.10)
equalsGesture.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.70)
equalsGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.7)


//Middle
equalsGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 0.5); 
equalsGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.7)


//Ring
equalsGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 0.5); 
equalsGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.7)


// Pinky
equalsGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 0.5)
equalsGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.6)
equalsGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.6)


