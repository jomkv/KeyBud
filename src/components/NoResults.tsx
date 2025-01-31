function NoResults() {
  return (
    <div
      className="bg-secondary d-flex align-items-center p-4 rounded-3"
      style={{
        color: "white",
      }}
    >
      <div className="d-flex align-items-center justify-content-center">
        <p className="mb-0 fs-2">Nothing to show</p>
      </div>
    </div>
  );
}

export default NoResults;
