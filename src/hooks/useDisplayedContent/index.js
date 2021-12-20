import { useState, useEffect, useContext, createContext } from 'react';

const displayedcontentContext = createContext();

export function ProvideDisplayedContent({ children }) {
  const _displayedcontent = useProvideDisplayedContent();
  return <displayedcontentContext.Provider value={_displayedcontent}>{children}</displayedcontentContext.Provider>;
}

export default function useDisplayedContent() {
  return useContext(displayedcontentContext);
}

function useProvideDisplayedContent() {
  const [domain, setDomain] = useState();
  const [displayed, setDisplayed] = useState();
  
  const parseDomain = ( domain ) => Object.keys(domain).reduce((acc, currKey) =>{
    if (/Schema$/.test(currKey)){
      acc['schemas'][currKey] = domain[currKey]
    }
    if(/Commands$/.test(currKey)){
      acc['commands'][currKey] = domain[currKey]
    }
    if(/Events$/.test(currKey)){
      acc['events'][currKey] = domain[currKey]
    }
    if(/Errors$/.test(currKey)){
      acc['errors'][currKey] = domain[currKey]
    }
    return acc;
  },{commands:{}, events:{}, schemas:{}, errors:{}})

  const setFullDomain = (data) =>{
    const parsedDomain = parseDomain(data)
    setDomain({...parsedDomain})
    console.log('domain',parsedDomain)
  }

  const displayEvent = (eventName) =>{ 
    let typeFound, entityFound, eventFound;
    Object.keys(domain).map((domainKey) =>{
      Object.keys(domain[domainKey]).map((entityKey) =>{
        Object.keys(domain[domainKey][entityKey]).map((eventKey) =>{
          if(eventKey === eventName){ entityFound = entityKey; typeFound = domainKey; eventFound = eventKey }
        })
      })
    })
    const toDisplay = {
      [typeFound]: {
        [entityFound]: {
          [eventFound]: domain[typeFound][entityFound][eventFound]
        }
      }
    }
    setDisplayed(toDisplay)
  }
  const displayEntity = (entityName) => {  //filtrar solo lo que sea de este entity del domain
    let typeFound, entityFound;
    Object.keys(domain).map((domainKey) =>{
      Object.keys(domain[domainKey]).map((entityKey) =>{
        if(entityKey === entityName){ 
          entityFound = entityKey;
          typeFound = domainKey;
        } 
      })
    })
    const toDisplay = {
      [typeFound]: {
        [entityFound]: domain[typeFound][entityFound]
        }
    }
    
    setDisplayed(toDisplay)
  }
  const displayType = (typeName) => {  //filtrar solo lo que sea de este entity del domain
    let typeFound;
    Object.keys(domain).map((domainKey) =>{
        if(domainKey === typeName){ 
          typeFound = domainKey;
        } 
    })
    const toDisplay = {
      [typeFound]: domain[typeFound]
    }
    setDisplayed(toDisplay)
  }


  return {
    domain,
    displayed,
    setFullDomain,
    displayEvent,
    displayEntity,
    displayType
  };
}
