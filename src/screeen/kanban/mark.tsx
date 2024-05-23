


export const Mark = ({name, keyword}: {name: string, keyword: string}) => {

    if(!keyword){
        return <>{name}</>

    }

    const arr = name.split(keyword);
    return <>
        {/* {arr.map((name, index) => index === 0 ? <span key={index}>{name}</span> : <span key={index} style={{color: 'red'}}>{keyword}</span>)}     */}
        {
            arr.map((nameStr, index) => {
                return <span key={index}>
                    {nameStr}
                    {
                        index === arr.length - 1 ? null : <span style={{color: 'red'}}>{keyword}</span>
                    }
                </span>
            })
        }
    </>

}