import React, { useState } from 'react';
import useDisplayedContent from '../../hooks/useDisplayedContent';
import {dissoc} from "rambda";

function Sidebar({ domain }) {
    const {displayEvent, displayEntity, displayType} = useDisplayedContent();
    const domainWithoutSchema = dissoc('schemas', domain);
    const schemas = domain.schemas;
  return (
    <div className='grid grid-rows-1'>
      {Object.keys(domainWithoutSchema).map((typeKey, key) => {
        return (
          <div key={key}>
              <DropdownTitle title={typeKey} onClickEvent={()=>displayType(typeKey)} styles={'capitalize cursor-pointer font-bold font-sans text-md  py-4 mt-2 text-gray-500 hover:bg-gray-200'}>
            {domainWithoutSchema[typeKey] &&
              Object.keys(domainWithoutSchema[typeKey]).map((entityKey, key) => {
                return (
                  <DropdownTitle key={key} title={entityKey} onClickEvent={()=>displayEntity(entityKey)} styles={'cursor-pointer font-semibold text-md  py-3 my-2 mt-2 text-gray-500 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'}>
                    {domainWithoutSchema[typeKey][entityKey] &&
                      Object.keys(domainWithoutSchema[typeKey][entityKey]).map(
                        (eventKey, key) => {
                          return (
                            <div className="grid grid-cols-10 hover:bg-gray-200 cursor-pointer py-2 my-2" onClick={()=>displayEvent(eventKey)}>
                            <div className="col-span-1"></div>
                            <div key={key} className='cols-span-9 text-sm  text-gray-500 ' >
                              {eventKey}
                            </div>
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
     {schemas &&
      <DropdownTitle title={'schemas'} onClickEvent={()=>displayType('schemas')} styles={'capitalize cursor-pointer font-bold font-sans text-md  py-4 mt-2 text-gray-500 hover:bg-gray-200'}>
        { Object.keys(schemas).map(
                        (eventKey, key) => {
                          return (
                            <div className="grid grid-cols-10 hover:bg-gray-200 cursor-pointer py-2 my-2" onClick={()=>displayEntity(eventKey)}>
                            <div className="col-span-1"></div>
                            <div key={key} className='cols-span-9 text-sm  text-gray-500 ' >
                              {eventKey}
                            </div>
                            </div>
                          );
                        }
                      )
          }
      </DropdownTitle>
     }
    </div>
  );
}

export default Sidebar;

const DropdownTitle = (props) =>{
    const [showContent, setShowContent] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const toggleShow = () =>{
        setShowContent(!showContent)
    }

    return(
        <>
        <div className={props.styles + ' grid grid-cols-10 flex items-center'} onClick={()=> {toggleShow(); props.onClickEvent()}} onMouseOver={()=> setIsHovering(true)} onMouseLeave={()=> setIsHovering(false)}>
          {isHovering ?
          <div className="col-span-1">
          {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg> */}
          </div>
          :
          <div className="col-span-1"></div>
          }
          <div className="col-span-8">
          {props.title}
          </div>
          {showContent ?
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          :
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          }
        </div>
           {showContent && props.children}
        </>
    )
}
