// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepButton from '@material-ui/core/StepButton';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import FirstStep from './FirstStep';
// import FlatInfo from './FlatSteps/FlatInfo';
// import Address from './FlatSteps/Address';
// import FlatAddress from './FlatSteps/FlatAddress';
// import FlatChecklist from './FlatSteps/FlatChecklist';
// import FlateePreferredAreas from './FlateeSteps/FlateePreferredAreas';
// import FlateeChecklist from './FlateeSteps/FlateeChecklist';
// import FlateeReview from './FlateeSteps/FlateeReview';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//   },
//   button: {
//     marginRight: theme.spacing(1),
//   },
//   completed: {
//     display: 'inline-block',
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
// }));

// const steps = [
//     {id: "username"},
//     {id: "flat-information"},
//     {id: "flat-address"},
//     {id: "flat-description"},
//     {id: "flat-checklist"},
//     {id: "flatee-information"},
//     {id: "flatee-area"},
//     {id: "flatee-checklist"},
//     {id: "flatee-review"},
// ]

// function getSteps() {
//   return steps;
// }

// function getStepContent(step) {
//   switch (step.id) {
//     case "username":
//         return <FirstStep className = "layout" {...prop} user = {user} updateUser = {updateUser}/>;
//     case "flat-information":
//         return <FlatInfo {...prop} user = {user} updateUser = {updateUser}/>;
//     case "flat-address":
//         return <Address {...prop} user = {user} updateUser = {updateUser}/>;
//     case "flat-description":
//         return <FlatAddress {...prop} user = {user} updateUser = {updateUser}/>;
//     case "flat-checklist":
//         return <FlatChecklist {...prop} user = {user} updateUser = {updateUser}/>;
//     case "flatee-area":
//         return <FlateePreferredAreas {...prop} user = {user} updateUser = {updateUser}/>;
//     case "flatee-checklist":
//           return <FlateeChecklist {...prop} user = {user} updateUser = {updateUser}/>;
//     case "flatee-review":
//           return <FlateeReview {...prop} user = {user} updateUser = {updateUser}/>;
//   }
// }

// export default function HorizontalNonLinearStepper() {
//   const classes = useStyles();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [completed, setCompleted] = React.useState({});
//   const steps = getSteps();

//   const totalSteps = () => {
//     return steps.length;
//   };

//   const completedSteps = () => {
//     return Object.keys(completed).length;
//   };

//   const isLastStep = () => {
//     return activeStep === totalSteps() - 1;
//   };

//   const allStepsCompleted = () => {
//     return completedSteps() === totalSteps();
//   };

//   const handleNext = () => {
//     const newActiveStep =
//       isLastStep() && !allStepsCompleted()
//         ? // It's the last step, but not all steps have been completed,
//           // find the first step that has been completed
//           steps.findIndex((step, i) => !(i in completed))
//         : activeStep + 1;
//     setActiveStep(newActiveStep);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleStep = (step) => () => {
//     setActiveStep(step);
//   };

//   const handleComplete = () => {
//     const newCompleted = completed;
//     newCompleted[activeStep] = true;
//     setCompleted(newCompleted);
//     handleNext();
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//     setCompleted({});
//   };

//   return (
//     <div className={classes.root}>
//       <Stepper nonLinear activeStep={activeStep}>
//         {steps.map((label, index) => (
//           <Step key={label}>
//             <StepButton onClick={handleStep(index)} completed={completed[index]}>
//               {label}
//             </StepButton>
//           </Step>
//         ))}
//       </Stepper>
//       <div>
//         {allStepsCompleted() ? (
//           <div>
//             <Typography className={classes.instructions}>
//               All steps completed - you&apos;re finished
//             </Typography>
//             <Button onClick={handleReset}>Reset</Button>
//           </div>
//         ) : (
//           <div>
//             <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
//             <div>
//               <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
//                 Back
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleNext}
//                 className={classes.button}
//               >
//                 Next
//               </Button>
//               {activeStep !== steps.length &&
//                 (completed[activeStep] ? (
//                   <Typography variant="caption" className={classes.completed}>
//                     Step {activeStep + 1} already completed
//                   </Typography>
//                 ) : (
//                   <Button variant="contained" color="primary" onClick={handleComplete}>
//                     {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
//                   </Button>
//                 ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
