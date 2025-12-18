import { Card, CardContent } from '@mui/material';

import './App.css';
import ShapeDraw from './components/PolyDraw/PolyDraw';

function App() {
  return (
    <>
      <Card>
        <CardContent>
          <ShapeDraw />
        </CardContent>
      </Card>
    </>
  );
}

export default App;
