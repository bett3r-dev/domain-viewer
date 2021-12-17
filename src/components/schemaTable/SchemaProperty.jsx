const SchemaProperty = ({ property, isNested = 0, name, isWhite }) => {
  return (
    <>
      {property.type === 'object' && property.patterns ? (
        <div className={`${isNested ? '' : 'border-t border-grey-50'}`}>
          <div className={`${isWhite ? 'bg-white' : 'bg-gray-100'} ml-${isNested*8} px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6`}>
            <div className='text-sm font-medium text-gray-500'>
              {name}
            </div>
            <div className='mt-1 text-sm text-gray-900 sm:mt-0 '>
              {property.type}
            </div>
            <div className='mt-1 text-sm text-gray-900 sm:mt-0 '>
            {/* {property.rules?.map( (rule) => `${rule.name}${ rule.args ? `: ${JSON.stringify(rule.args)}` : '' }` )} */}
            </div>
            <div className='mt-1 text-sm text-gray-900 sm:mt-0 col-span-2'>
              {property.patterns[0]?.rule?.flags?.description}
            </div>
          </div>
          {property.type === "object" && property.patterns && Object.keys(property.patterns[0]?.rule.keys).map((propertyKey, key) =>{
                return <SchemaProperty key={key} isWhite={isWhite} name={propertyKey} property={property.patterns[0]?.rule.keys[propertyKey]} isNested={isNested+1} />
            })
          }
        </div>
      )
      :
      (
        <div className={`${isNested ? '' : 'border-t border-grey-50'}`}>
          <div className={`${isWhite ? 'bg-white' : 'bg-gray-100'} ml-${isNested*8} px-4 py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6`}>
            <div className='text-sm font-medium text-gray-500'>
              {name}
            </div>
            <div className='mt-1 text-sm text-gray-900 sm:mt-0 '>
              {property.type}
            </div>
            <div className='mt-1 text-sm text-gray-900 sm:mt-0 '>
              {property.rules?.map( (rule) => `${rule.name}${ rule.args ? `: ${JSON.stringify(rule.args)}` : '' }` )}
            </div>
            <div className='mt-1 text-sm text-gray-900 sm:mt-0 col-span-2'>
              {property.flags?.description}
            </div>
          </div>
          {property.type === 'object' && property.keys &&
            Object.keys(property.keys).map((propertyKey, key) => 
              <SchemaProperty key={key} isWhite={isWhite} name={propertyKey} property={property.keys[propertyKey]} isNested={isNested+1} />
            )}
        </div>
      )}
    </>
  );
};
export default SchemaProperty;
