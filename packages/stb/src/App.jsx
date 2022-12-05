import "./App.css";
import Navigation from "./components/Navigation";

function App({ children }) {
  return (
    <>
      <Navigation />
      <div className="flex items-center justify-center h-screen">
        <div className="artboard phone-4">
          <div className="pt-20">{children}</div>
        </div>
      </div>
    </>
  );
}

export default App;
