import React from "react";
import HabitsContainer from './HabitContainer';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {toast}  from 'react-toastify';
import "../styles/Habit.css";


const Habits=()=>{
		//getting state from store reducer
		const habitData = useSelector(state => state);

		const [isVisibleId, setIsVisibleId] = useState("");
		const [habit, setHabit] = useState("");
		const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    const navigate=useNavigate();

		//handing the add habits with validation
		const addedHabit = () => {
		
				if (habit === "" && description==="") {
					toast.error("Please fill habit and its description");
					return;
				}
		
				function formatDate(date) {
					var dd = date.getDate();
					var mm = date.getMonth() + 1;
					var yyyy = date.getFullYear().toString().substring(2);
					if (dd < 10) {
						dd = "0" + dd;
					}
					if (mm < 10) {
						mm = "0" + mm;
					}
					date = dd + "/" + mm + "/" + yyyy;
					return date;
				}
		
		
				const today = new Date();
				let next7daysArray = [];
				let dates = [];
			
				for (let i = 0; i < 7; i++) {
					const nextDate = new Date();
					nextDate.setDate(today.getDate() + i);
				
					let formatedDate = formatDate(nextDate);
					next7daysArray.push(formatedDate);
					let currentDate = { date: next7daysArray[i], status: "none" };
					dates.push(currentDate);
				}
				console.log(dates);

				//generating random number for unique ids
				var randomNumber = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
				
				let habitToBeAdded = {
					id: randomNumber,
					title: habit,
					description: description,
					dates: dates,
				};
			
				setHabit("");
				setDescription("");
		
				dispatch({type:'ADD_HABITS',payload:habitToBeAdded});
				toast.success("Habit added successfully");
		};

		
		return(
				<div className="App"> 
			 			<div className="habit-body">
							
							{/* Top container */}
							<div className="background-top-container">
								<div className="camera"></div>	
								<div className="speaker"></div>
							</div>
					
							{/*Middle container  */}
							<div className="background-middle-container">	
									<h3 className="text-center">Habit Tracker</h3>
									
									{/* Habit forms */}
									<section className="habit-form">

										<div className="inputs">
												<input 
															type="text"
															value={habit}
															onChange={(e) => setHabit(e.target.value)}
															placeholder="Write habit......"
															required
												/>
										</div>

										<div className="inputs">
											
												<input 
													type="text"
													value={description}
													onChange={(e) => setDescription(e.target.value)}
													placeholder="Write discription......"
													required
												/>
										</div>

										<div className="inputs">
												<button onClick={addedHabit}>Add Habit</button>
										</div>
									</section><br />


									

									{/* Habits list with HabitContainer component */}
									<section className="habit-list-cobtainer">
											
											{habitData.length === 0 && 
													<div className="not-habit-found">
														<span>No habits Found , Please add first</span>
													</div>
											}


											{habitData.map((habit, index) => {
												
												return (
													<HabitsContainer
														key={index}
														habitName={habit.title}
														habitDiscription={habit.description}
														habitStatus={habit.dates}
														habitId={habit.id}
														
													/>
												);
											})}
										</section>
							</div>

							{/* Bottom Conatainer */}
							<div className="background-bottom-container"></div>
					</div>
			
				</div>
			)
}

export default Habits;