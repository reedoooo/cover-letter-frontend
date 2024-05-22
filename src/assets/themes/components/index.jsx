import { globals } from '..';
import container from './container';
import {
  formControl,
  formHelperText,
  formLabel,
  input,
  inputBase,
  inputFilled,
  inputLabel,
  inputOutlined,
  textField,
} from './forms';
import root from './buttons/root';
import outlined from './buttons/outlined';
import icon from './icon';
import svgIcon from './svgIcon';
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // === GLOBALS AND LAYOUT ===
  MuiCssBaseline: {
    styleOverrides: {
      ...globals,
      ...container,
    },
  },
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
  // === FORMS / INPUTS / VARIANTS ===
  MuiOutlinedInput: {
    ...inputOutlined,
  },
  MuiFilledInput: {
    ...inputFilled,
  },
};
