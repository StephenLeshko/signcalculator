function NumScreen({comp}){
    
    const showComps = (comp) =>{
        return (
            <p>{comp}</p>
        )
    }
    
    return (
        <div className='elm-border digits calc-display'>
            <p>{comp}</p>
            <p>123456 + 8</p> 
            <p>99 / 0</p> 
        </div>
            

    )
}
export default NumScreen