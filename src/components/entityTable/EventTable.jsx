import SchemaTable from "../schemaTable/SchemaTable";
import EntityTable from "./EntityTable";

function EventTable({header, type, schema, isPublic, errors}) {
    const colorMap = {
        event: "yellow-500",
        command: "blue-400",
        error: "red-500"
    }
    return (
        <div className={`bg-${colorMap[type]} bg-opacity-5 shadow-lg overflow-hidden w-full my-4`}>
            <div className="px-4 py-5 sm:px-6">
                <h3 className={`text-lg leading-6 font-bold text-${colorMap[type]}`}>
                {header} 
                </h3>
                <h6 className={"text-lg font-normal italic text-gray-500"}>{type === 'command' ? isPublic ? "public" : "private" : ""}</h6>
            </div>
            {schema && 
              <SchemaTable header={`${header} schema`} headerDescription={"La descripcion"} properties={schema?.keys} />
            }
            {errors && 
              <div className="bg-gray-100 shadow-lg overflow-hidden w-5/6 mx-auto mt-4 mb-8">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 py-4">
                    {header + " Errors"}
                    </h3>
                    {errors.map(error=> 
                    <p className="mt-1 max-w-2xl text-sm font-medium text-red-500 py-2">
                        {error}
                    </p>
                    )}
                    
            </div>
              </div>
            }
        </div>
    );
}

export default EventTable;


