const SuccessMessage = ({message, className}) =>{
    return (
      <div className={`base-textbox-message-success ${className}`}>
        <p className='text-xs'>{message}</p>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={16} height={16}>
          <path className='heroicon-ui' d='M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z' stroke='currentColor' strokeWidth='0.25' strokeLinecap='round' strokeLinejoin='round' fill='currentColor' />
        </svg>
      </div>
    );
}

export default SuccessMessage;