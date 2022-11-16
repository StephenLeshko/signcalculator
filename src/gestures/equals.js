// Import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const equalsGesture = new GestureDescription('equals'); 

// Thumb 
equalsGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.2)
equalsGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.2)

// Index
equalsGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.2)
equalsGesture.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.2)
equalsGesture.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.2)
equalsGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.2)


//Middle
equalsGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.2); 
equalsGesture.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.2)
equalsGesture.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.2)


//Ring
equalsGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.2); 
equalsGesture.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 1.2)
equalsGesture.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.2)


// Pinky
equalsGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.2)
equalsGesture.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.2)
equalsGesture.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.2)


