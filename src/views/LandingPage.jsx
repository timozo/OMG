export default function LandingPage() {
  return (
    <>
      <body className="landing_page">
        <div className="landing_text">
          <h1 className="landing_header">Opiskelijoiden Mielipide Gallup</h1>
          <h3 className="landing_prompt">
            Find your school or course to get started
          </h3>
        </div>
        <div className="landing_search_container">
          <input
            type="text"
            placeholder="Search..."
            className="landing_search"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button /*onClick={handleSearch}*/ className="landing_search_btn">
            Search
          </button>
        </div>
      </body>
    </>
  );
}
