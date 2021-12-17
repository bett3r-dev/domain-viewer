import React, { useState } from 'react';
import useDisplayedContent from '../../hooks/useDisplayedContent';

function Sidebar({ domain }) {
    const {displayEvent, displayEntity, displayType} = useDisplayedContent();
  return (
    <div className='grid grid-rows-1'>
      {Object.keys(domain).map((typeKey, key) => {
        return (
          <div key={key}>
              <DropdownTitle title={typeKey} onClickEvent={()=>displayType(typeKey)} styles={'font-bold text-lg px-4 py-2 mt-2'}>
            {domain[typeKey] &&
              Object.keys(domain[typeKey]).map((entityKey, key) => {
                return (
                  <DropdownTitle key={key} title={entityKey} onClickEvent={()=>displayEntity(entityKey)} styles={'font-semibold px-4 py-2 mt-2 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'}>
                    {domain[typeKey][entityKey] &&
                      Object.keys(domain[typeKey][entityKey]).map(
                        (eventKey, key) => {
                          return (
                            <div key={key} className='text-sm px-4 py-2 mt-2' onClick={()=>displayEvent(eventKey)}>
                              {eventKey}
                            </div>
                          );
                        }
                      )}
                  </DropdownTitle>
                );
              })}
              </DropdownTitle>
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;

const DropdownTitle = (props) =>{
    const [showContent, setShowContent] = useState(true);

    const toggleShow = () =>{
        setShowContent(!showContent)
    }

    return(
        <>
        <div className={props.styles} onClick={()=> {toggleShow(); props.onClickEvent()}}>
                      {props.title}
                    </div>
           {showContent && props.children}
        </>
    )
}
