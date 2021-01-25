import React from 'react'

const List = (props: any) => {

    return (
        <div>
            {props.data.map((item: any, index: number) => (
                props.item(item, index)
            ))}
        </div>
    )
}

export default List
