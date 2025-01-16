import { Board } from "../components/brain-board/board";
import { GridBackground } from "../components/ui/grid-background";

const Dashboard = () => {
  return (
    <GridBackground>
      <div >
        <Board/>
      </div>
    </GridBackground>
  )
}

export default Dashboard;
