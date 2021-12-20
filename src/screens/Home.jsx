import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import EntityTable from '../components/entityTable/EntityTable';
import SchemaTable from '../components/schemaTable/SchemaTable';
import Sidebar from '../components/sidebar/Sidebar';
import useDisplayedContent from '../hooks/useDisplayedContent';
import useTranslation from '../hooks/useTranslation';

export default function Home(props) {
  let history = useHistory();
  const {__} = useTranslation();
  const {setFullDomain, displayed, domain, displayEvent} = useDisplayedContent();
  const [params, setParams] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const searchParams = new URLSearchParams( window.location.search );
    const params = Object.fromEntries(searchParams);
    const url = params.domain || 'http://localhost:1984/domain'
    fetch(url)
        .then(response => response.json())
        .then((data) =>setFullDomain(data))
        .then(()=> setIsLoading(false))
  },[])

  useEffect(()=>{
    const searchParams = new URLSearchParams( window.location.search );
    const params = Object.fromEntries(searchParams);
    if(params.event && domain){
      displayEvent(params.event)
    }
  },[domain])
  
  //TODO: cambiar el sidebar para los schemas
  //TODO: los schemas que vienen sin nombre de propiedad, solo type

    return (
        <div className='relative md:fixed grid grid-cols-10 min-h-screen w-full my-4 inset-0'>
            <div className="col-span-2 border-r border-grey-50 h-screen w-full relative overflow-y-auto overflow-x-auto">
              {domain && <Sidebar domain={domain}/>}
            </div>
            <div className='sm:text-center lg:text-left col-span-8 w-full h-screen overflow-y-auto'>
              {displayed?.commands &&
                Object.keys(displayed.commands).map((entityKey, key) =>
                <EntityTable key={key} type={'command'} header={entityKey} events={displayed.commands[entityKey]} />
              )}
              {displayed?.events &&
                Object.keys(displayed.events).map((entityKey, key) =>
                <EntityTable key={key} type={'event'} header={entityKey} events={displayed.events[entityKey]} />
              )}
              {displayed?.errors &&
                Object.keys(displayed.errors).map((entityKey, key) =>
                <EntityTable key={key} type={'error'} header={entityKey} events={displayed.errors[entityKey]} />
              )}
              {displayed?.schemas && 
              Object.keys(displayed.schemas).map((schemaKey, key)=>
              <div className="px-4 py-5 sm:px-20">
              <SchemaTable key={key} header={schemaKey} headerDescription={"La descripcion"} properties={displayed.schemas[schemaKey]?.keys}></SchemaTable>
              </div>
              )}
            </div>
        </div>
  );
}
