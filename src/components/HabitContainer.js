import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import '../styles/HabitContainer.css';
import Done from '../images/done.png';
import notDone from '../images/not done.png';
import None from '../images/none.png';
import Delete from '../images/delete.png';

const HabitsContainer=({habitName, habitDiscription, habitStatus, habitId})=>{
	
				const dispatch = useDispatch();

				// Handing status upadate action
				const updateHabitsStatus = (e) => {
					
					const data = {
						date: e.target.getAttribute("data-date"),
						id: habitId,
					};

					dispatch({type:"UPDATE_HABIT_STATUS",payloadData:data});
					toast.success("Status Updated Successfully");
				};
				
				//Handling delete habits 		
				const deleteHabit=(habitId)=>{
					alert("Are you sure want to delete habits?");
					dispatch({type:'DELETE_HABITS',payload:habitId});
					toast.error("Habit deleted Successfully");
				}
	
	
			return (

					// Getting individual conatainer with habit description
					<div className="habit-list">
				
							<div className="habit-details">
									<div className="habit-left-details">
										<div className="habit-name">{habitName}</div>&nbsp;
										<div className="habit-description">({habitDiscription})</div>
									</div>
									
									{/* Handing delete action */}
									<div className="habit-delete">
										<img src={Delete} 
													alt="delete habit" 
													width='20' 
													height='20'
													onClick={() => deleteHabit(habitId)}  />
									</div>
							</div>

							{/* container contain date and status action on click of image */}
							<div className="individual-div" >
								{Object.values(habitStatus).map((date, index) => {
									return (
											
												<div className="in" key={index}>
													<span className="dates">{habitStatus[index].date}</span><br />
													<span className="status">
																{habitStatus[index].status === "none" ? 
																		 <img src={None} width='20' height='20' 	data-date={habitStatus[index].date}
																		onClick={updateHabitsStatus} alt="None" />
																		
																	: habitStatus[index].status === "done" ? 
																	
																	 <img src={Done} width='20' height='20' 	data-date={habitStatus[index].date}
																		onClick={updateHabitsStatus} alt="Done"/>
																	 
																	
																	: <img src={notDone} width='20' height='20' alt="Not Done" />
																}
													</span>
												</div>
									)
								})}
							</div>
					</div>
			);
		}

export default HabitsContainer;