import {Container} from "@mui/material";

import {FacetSearch} from "./ui/components/FacetSearch";

function App() {
  return (
    <div className="App">
      <Container style={{padding: '1em'}}>
        <FacetSearch/>
      </Container>
    </div>
  );
}

export default App;
