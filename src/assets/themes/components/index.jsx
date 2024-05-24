import { globals } from '..';
import appBar from './appBar';
import outlined from './buttons/outlined';
import root from './buttons/root';
import { baseCard, cardContent, cardMedia } from './card';
import container from './container';
import {
  baseDialog,
  dialogActions,
  dialogContent,
  dialogContentText,
  dialogTitle,
} from './dialog';
import divider from './divider';
import {
  formControl,
  formHelperText,
  formLabel,
  input,
  inputBase,
  inputFilled,
  inputLabel,
  inputOutlined,
  switchButton,
  textField,
} from './forms';
import icon from './icon';
import { baseMenu, menuItem } from './menu';
import svgIcon from './svgIcon';
import { tableCell, tableContainer, tableHead } from './table';
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // === GLOBALS AND LAYOUT ===
  MuiCssBaseline: {
    styleOverrides: {
      ...globals,
      ...container,
    },
  },
  // === NAVIGATION ===
  MuiAppBar: { ...appBar },
  MuiMenu: { ...baseMenu },
  MuiMenuItem: { ...menuItem },
  // === DIVIDERS ===
  MuiDivider: { ...divider },
  // === DIALOGS ===
  MuiDialog: { ...baseDialog },
  MuiDialogTitle: { ...dialogTitle },
  MuiDialogContent: { ...dialogContent },
  MuiDialogContentText: { ...dialogContentText },
  MuiDialogActions: { ...dialogActions },
  // === CARD ===
  MuiCard: { ...baseCard },
  MuiCardMedia: { ...cardMedia },
  MuiCardContent: { ...cardContent },
  // === TABLE ===
  MuiTableContainer: { ...tableContainer },
  MuiTableHead: { ...tableHead },
  MuiTableCell: { ...tableCell },
  // === BUTTONS ===
  MuiButton: {
    styleOverrides: {
      root: { ...root.base },
      // contained: { ...contained.base },
      // containedSizeSmall: { ...contained.small },
      // containedSizeLarge: { ...contained.large },
      // containedPrimary: { ...contained.primary },
      // containedSecondary: { ...contained.secondary },
      outlined: { ...outlined.base },
      outlinedSizeSmall: { ...outlined.small },
      outlinedSizeLarge: { ...outlined.large },
      outlinedPrimary: { ...outlined.primary },
      outlinedSecondary: { ...outlined.secondary },
      outlinedInfo: { ...outlined.info },
      outlinedError: { ...outlined.error },
      outlinedSuccess: { ...outlined.success },
      // holo: { ...holo.base },
      // holoSizeSmall: { ...holo.small },
      // holoSizeMedium: { ...holo.medium },
      // holoSizeLarge: { ...holo.large },
      // holoPrimary: { ...holo.primary },
      // holoSecondary: { ...holo.secondary },
      // text: { ...buttonText.base },
      // textSizeSmall: { ...buttonText.small },
      // textSizeLarge: { ...buttonText.large },
      // textPrimary: { ...buttonText.primary },
      // textSecondary: { ...buttonText.secondary },
    },
  },
  MuiIcon: { ...icon },
  MuiSvgIcon: { ...svgIcon },
  // === FORMS ===
  MuiFormLabel: {
    ...formLabel,
  },
  MuiFormControl: {
    ...formControl,
  },
  MuiTextField: {
    ...textField,
  },
  // === FORMS / INPUTS ===
  MuiInputBase: { ...inputBase },
  MuiInput: { ...input },
  MuiInputLabel: {
    ...inputLabel,
  },
  MuiFormHelperText: {
    ...formHelperText,
  },
  MuiSwitch: { ...switchButton },
  // === FORMS / INPUTS / VARIANTS ===
  MuiOutlinedInput: {
    ...inputOutlined,
  },
  MuiFilledInput: {
    ...inputFilled,
  },
};
