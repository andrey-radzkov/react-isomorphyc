import teal from "@material-ui/core/colors/teal";
import amber from "@material-ui/core/colors/amber";
import red from "@material-ui/core/colors/red";
import createPalette from "@material-ui/core/styles/createPalette";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const muiTheme = createMuiTheme({
  palette: createPalette({
    primary: teal,
    accent: amber,
    error: red,
    type: 'light'
  })
});
