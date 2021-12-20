import SchemaProperty from "./SchemaProperty";

function SchemaTable({header, headerDescription, properties}) {
    console.log('que hay aca', properties)
    return (
        <div className="bg-gray-100 shadow-lg overflow-hidden w-full mx-auto mt-4 mb-8 ">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                {header}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {headerDescription}
                </p>
            </div>
            <div className='bg-gray-500 border-t  border-grey-50 px-4 py-2 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6'>
                <div className='text-sm font-medium text-white'>
                {"Property"}
                </div>
                <div className='text-sm font-medium text-white'>
                    {"Type"}
                </div>
                <div className='text-sm font-medium text-white'>
                    {"Format/Rules"}
                </div>
                <div className='text-sm font-medium text-white col-span-2'>
                {"Description"}
                </div>
            </div>
            {properties && Object.keys(properties).map((propertyKey, key) =>{
                return <SchemaProperty key={key} property={properties[propertyKey]} name={propertyKey} isWhite={key%2 === 0}></SchemaProperty>
            })}
        </div>
    );
}

export default SchemaTable;


