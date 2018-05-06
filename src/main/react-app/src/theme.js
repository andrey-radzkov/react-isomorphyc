import {createMuiTheme} from "material-ui";
import teal from "material-ui/colors/teal";
import amber from "material-ui/colors/amber";
import red from "material-ui/colors/red";
import createPalette from "material-ui/styles/createPalette";

//TODO: my theme
export const muiTheme = createMuiTheme({
  palette: createPalette({
    primary: teal,
    accent: amber,
    error: red,
    type: 'light'
  })
});
