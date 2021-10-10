import { createTheme } from '@material-ui/core/styles';

//Colour pallete
const GREEN = "#007A78";
const YELLOW = "#FFC745";

//Override themes
const THEME = createTheme({

    //Overrides primary colour
    palette: {
      primary: {
        main: GREEN,
      },
      secondary: {
        main: YELLOW,
      }
    },
  
    typography: {
     "fontFamily": `"Lexend Deca", "Helvetica", "Arial", sans-serif`,
     "fontWeightLight": 300,
     "fontWeightRegular": 500,
     "fontWeightMedium": 800,
    }
  });
  
  THEME.overrides = {
  
    //Override buttons
      MuiButton: {
    
        root: {
    
          borderRadius: 30, // round corners
    
          textTransform: 'none', // removes uppercase transformation
    
        },
    
        containedPrimary: {
    
          '&:hover': { // changes colors for hover state
    
            backgroundColor: THEME.palette.secondary.main,
    
            color: THEME.palette.primary.dark,
    
          },
    
        },
    
        containedSecondary: {
    
          fontWeight: 700, // makes text bold
    
        },
    
      },

  }

 export default THEME;