import React, {useEffect, useRef} from "react";


function NumScreen({comps}){
    const screenRef = useRef(null)
    useEffect(() =>{
        console.log('resetting scroll')
        // screenRef.current.scrollTop = screenRef.current.scrollHeight
        // screenRef.current.scrollLeft = screenRef.current.scrollWidth
    })
    
    const showComps = (comp) =>{
        return (
            
            <div>
                <p>{comp}</p>
                <hr></hr>
            </div>
            
        )
    }
    
    return (
        <div ref={screenRef} className='elm-border digits calc-display'>
            {comps.map(showComps)}
        </div>
            

    )
}
export default NumScreen