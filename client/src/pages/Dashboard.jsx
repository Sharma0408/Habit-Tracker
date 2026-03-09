import { useEffect, useState } from "react";
import { getHabits } from "../api/habitApi";

function Dashboard(){

  const [habits,setHabits] = useState([]);

  useEffect(() => {

    const fetchHabits = async () => {

      const res = await getHabits();
      setHabits(res.data.habits);

    };

    fetchHabits();

  },[]);

  return(

    <div>

      <h1>Dashboard</h1>

      {habits.map((habit)=>(
        <p key={habit._id}>{habit.title}</p>
      ))}

    </div>

  );

}

export default Dashboard;