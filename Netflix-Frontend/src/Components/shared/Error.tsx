

const Error = (props:{ message:any }) => {
  return (
    <div className="flex items-center justify-center h-screen text-red-500">
      {/* Display the error message */}
      <div>
        <p className="text-2xl font-bold mb-4">Error</p>
        <p>{props.message}</p>
      </div>
    </div>
  );
};

export default Error;