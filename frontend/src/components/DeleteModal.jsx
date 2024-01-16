const DeleteModal = ({ action, cancel }) => {
  console.log(action, cancel);
  return (
    <main className="fixed z-50 top-0 left-0 h-screen w-screen bg-gray-600 bg-opacity-75 backdrop-blur-sm flex justify-center items-center">
      <div className="card">
        <h1 className="mb-4">Warning!</h1>
        <hr />
        <h2 className="my-8">Are you sure want to delete this thing?</h2>
        <footer className="flex justify-between">
          <button className="btn-secondary" onClick={cancel}>
            No
          </button>
          <button
            className="btn-primary"
            onClick={() => {
              action();
              cancel();
            }}
          >
            Yes
          </button>
        </footer>
      </div>
    </main>
  );
};

export default DeleteModal;
