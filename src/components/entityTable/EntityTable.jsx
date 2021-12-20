import EventTable from "./EventTable";

function EntityTable({header, type, events}) {
    const colorMap = {
        event: "yellow-500",
        command: "blue-400",
        error: "red-500"
    }
    return (
        <div className="bg-white shadow-lg overflow-hidden w-full my-4">
            <div className="px-4 py-5 sm:px-20">
                <h3 className={`text-3xl leading-6 font-bold text-${colorMap[type]}`}>
                {header}
                </h3>
            </div>
            {events && 
              Object.keys(events).map((eventKey, key)=>{
              return <EventTable key={key} type={type} header={eventKey}
              headerDescription={"La descripcion"} isPublic={events[eventKey].isPublic}
              schema={events[eventKey].schema} errors={events[eventKey].errors} />
              })
            }
        </div>
    );
}

export default EntityTable;

