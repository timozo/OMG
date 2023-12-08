import Header from "../comonents/Header";

export default function LandingPage() {
  return (
    <body className="landing_page">
      <Header />
      <span className="landing_text">
        <h1 className="landing_header">Opiskelijoiden Mielipide Gallup</h1>
        <h3 className="landing_prompt">
          Find your school or course to get started
        </h3>
      </span>
    </body>
  );
}
