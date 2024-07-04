import React, { useState } from 'react';
import Component2 from './Component2';

interface Component1Props {

}

const Component1: React.FC<Component1Props> = ({  }) => {
    const [isGreen, setIsGreen] = useState(false);


    return (
        <div className="container">
            <div className={`circle ${isGreen ? 'green' : 'red'}`}></div>
            <Component2 onCallback={()=>{}}  />
        </div>
    );
};

export default Component1;