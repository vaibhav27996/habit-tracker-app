let habitsArray = localStorage.getItem("habits");
if (habitsArray === null) {
	habitsArray = [];
} else {
	habitsArray = JSON.parse(localStorage.getItem("habits"));
}

// adding initia state in local storage
const initialState = habitsArray;

const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        
        /*Add habits with given data and set into localstorage*/
        case 'ADD_HABITS':
           
            state=[action.payload,...state];
            const newHabitsArr = state;
			localStorage.setItem("habits", JSON.stringify(newHabitsArr));
            return state;

        /*Delete the habit with id and sel into localStorage */
        case  'DELETE_HABITS' :
       
            const habitFromLocalStorage = JSON.parse(localStorage.getItem("habits"));
            let newArray = habitFromLocalStorage.filter(
                (habit) => habit.id !== action.payload
            );
            
            localStorage.setItem("habits", JSON.stringify(newArray));
    
            return newArray;

        /*Update the habit status */    
        case 'UPDATE_HABIT_STATUS':

            /**The action.payloadData contain id and selected date */
            const datas= action.payloadData;
            
            /*find the that specific id array from localstorage*/
            const habitFromLocalSt =JSON.parse(localStorage.getItem("habits"));
            let haveToUpdateHabit = habitFromLocalSt.filter(
				(habit) => habit.id === datas.id
			);

            let habitObjectToBeUpdated = haveToUpdateHabit[0];

            //Map on that arrays date and check array date is match with action.payload.date
            let newDateArray = habitObjectToBeUpdated.dates.map((date) => {

                //if you get that matched data and update the status
				if (date.date === datas.date) {
					
					if (date.status === "none") {
						date.status = "done";
					} else if (date.status === "done") {
						date.status = "fail";
					} else if (date.status === "fail") {
						date.status = "none";
					}
					
				}
				
				return date;
			});
            // console.log(newDateArray);

            //find the that specific id entry and replace dates array with newDateArray
            let newArrToStoreInLocalSto=habitFromLocalSt.map((details)=>{

                if(details.id === datas.id ){
                    details.dates=newDateArray;
                }

                return details;
            });

            //store into localstorage and state also
            localStorage.setItem("habits",JSON.stringify(newArrToStoreInLocalSto));
            state=newArrToStoreInLocalSto;

            return state;

        default:
            return state;
    }
}

export default storeReducer;
