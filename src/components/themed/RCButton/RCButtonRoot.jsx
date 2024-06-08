import { Button } from '@mui/material';
import { styled as styledDefault } from 'styled-components';

const RCButtonRoot = styledDefault(Button)(({ ownerState, theme }) => {
  const { palette, functions, borders, boxShadows, typography } = theme;
  const {
    color,
    variant,
    size,
    circular,
    iconOnly,
    darkMode,
    // textSizeVariant,
    // textWeightVariant,
  } = ownerState;
  const { white, text, transparent, gradients, grey } = palette;
  const { boxShadow, linearGradient, pxToRem, rgba } = functions;
  const { borderRadius } = borders;
  const { colored } = boxShadows;
  // const getFontSizeVariant = () => {
  //   switch (textSizeVariant) {
  //     case 'header':
  //       return 'h6';
  //     case 'body':
  //       return 'body1';
  //     case 'default':
  //     case 'button':
  //     default:
  //       return 'button';
  //   }
  // };
  // const getFontWeightVariant = () => {
  //   switch (textWeightVariant) {
  //     case 'bold':
  //       return 'bold';
  //     case 'regular':
  //       return 'regular';
  //     default:
  //       return 'regular';
  //   }
  // };
  // const fontSizeVariant = getFontSizeVariant();
  // const fontWeightVariant = getFontWeightVariant();
  // const commonStyles = {
  //   fontSize: typography[fontSizeVariant].fontSize,
  //   fontWeight: typography[fontWeightVariant],
  // };
  const containedStyles = () => {
    const backgroundValue = palette[color] ? palette[color].main : white.main;
    const focusedBackgroundValue = palette[color]
      ? palette[color].focus
      : white.focus;
    const boxShadowValue = colored[color]
      ? `${boxShadow(0, 3, palette[color].main, 0.15)}, ${boxShadow(
          0,
          3,
          palette[color].main,
          0.2
        )}, ${boxShadow(0, 1, palette[color].main, 0.15)}`
      : 'none';
    const hoveredBoxShadowValue = colored[color]
      ? `${boxShadow(0, 14, palette[color].main, 0.4)}, ${boxShadow(
          4,
          0.15
        )}, ${boxShadow(0, 8, palette[color].main, 0.2)}`
      : 'none';
    let colorValue = white.main;
    let focusedColorValue = white.main;
    if (
      !darkMode &&
      (color === 'white' || color === 'light' || !palette[color])
    ) {
      colorValue = text.main;
    } else if (darkMode && color === 'white') {
      colorValue = grey[600];
    }
    if (color === 'white') {
      focusedColorValue = text.main;
    } else if (color === 'primary' || color === 'error' || color === 'dark') {
      focusedColorValue = white.main;
    }
    return {
      background: backgroundValue,
      color: colorValue,
      boxShadow: boxShadowValue,
      '&:hover': {
        backgroundColor: backgroundValue,
        boxShadow: hoveredBoxShadowValue,
      },
      '&:focus:not(:hover)': {
        backgroundColor: focusedBackgroundValue,
        boxShadow: palette[color]
          ? boxShadow(0, 0, palette[color].main, 0.5)
          : boxShadow(0, 0, white.main, 0.5),
      },
      '&:disabled': {
        color: focusedColorValue,
      },
    };
  };
  const outlinedStyles = () => {
    try {
      const backgroundValue =
        color === 'white' ? rgba(white?.main, 0.1) : transparent?.main;
      const colorValue = palette?.[color]?.main || white?.main;
      const boxShadowValue = palette?.[color]
        ? boxShadow([0, 0], [0, 3.2], palette[color]?.main, 0.5)
        : boxShadow([0, 0], [0, 3.2], white?.main, 0.5);
      let borderColorValue = palette?.[color]?.main || rgba(white.main, 0.75);

      if (!palette?.[color]) {
        borderColorValue = rgba(white.main, 0.75);
      }

      return {
        color: colorValue,
        background: transparent?.main,
        borderColor: borderColorValue,
        boxShadow: boxShadowValue,
        '&:hover': {
          backgroundColor: backgroundValue,
          borderColor: borderColorValue,
        },
        '&:active': {
          backgroundColor: colorValue,
          color: white?.main,
          opacity: 0.85,
        },
      };
    } catch (error) {
      console.error('Error in outlinedStyles:', error);
      return {};
    }
  };
  const gradientStyles = () => {
    const backgroundValue =
      color === 'white'
        ? white?.main
        : linearGradient(gradients[color]?.main, gradients[color]?.state);
    let colorValue = white.main;
    if (
      !darkMode &&
      (color === 'white' || color === 'light' || !palette[color])
    ) {
      colorValue = text.main;
    } else if (darkMode && color === 'light') {
      colorValue = gradients.dark.state;
    }
    return {
      background: backgroundValue,
      color: colorValue,
      '&:hover': {
        backgroundColor: white.main,
      },
    };
  };
  const textStyles = () => {
    const colorValue = palette[color] ? palette[color].main : white.main;
    return {
      color: colorValue,
    };
  };
  const circularStyles = () => ({
    borderRadius: borderRadius.section,
  });
  const iconOnlyStyles = () => {
    let sizeValue = pxToRem(38);
    if (size === 'small') {
      sizeValue = pxToRem(25.4);
    } else if (size === 'large') {
      sizeValue = pxToRem(52);
    }
    let paddingValue = `${pxToRem(11)} ${pxToRem(11)} ${pxToRem(10)}`;
    if (size === 'small') {
      paddingValue = pxToRem(4.5);
    } else if (size === 'large') {
      paddingValue = pxToRem(16);
    }
    return {
      width: sizeValue,
      minWidth: sizeValue,
      height: sizeValue,
      minHeight: sizeValue,
      padding: paddingValue,
      '& .material-icons': {
        marginTop: 0,
      },
      '&:hover, &:focus, &:active': {
        transform: 'none',
      },
    };
  };
  const holoStyles = () => {
    const backgroundValue =
      color === 'white' || !gradients[color]
        ? white.main
        : linearGradient(gradients[color].main, gradients[color].state);
    let colorValue = white.main;
    if (
      !darkMode &&
      (color === 'white' || color === 'light' || !palette[color])
    ) {
      colorValue = text.main;
    } else if (darkMode && color === 'light') {
      colorValue = gradients.dark.state;
    }
    return {
      background: backgroundValue,
      color: colorValue,
      '&:hover': {
        backgroundColor: white.main,
      },
    };
  };

  return {
    // ...commonStyles,
    ...(variant === 'contained' && containedStyles()),
    ...(variant === 'outlined' && outlinedStyles()),
    ...(variant === 'gradient' && gradientStyles()),
    ...(variant === 'holo' && holoStyles()),
    ...(variant === 'text' && textStyles()),
    ...(circular && circularStyles()),
    ...(iconOnly && iconOnlyStyles()),
  };
});

export default RCButtonRoot;

// /* eslint-disable max-len */
// import { Button } from '@mui/material';
// import useMode from 'hooks/useMode';
// const { default: styledDefaultDefault } = require('styledDefaultDefault-components');
// const RCButtonRoot = styledDefaultDefault(Button)(({ ownerState }) => {
//   const { theme } = useMode();
//   const { palette, functions, borders, boxShadows, typography } = theme;
//   const {
//     color,
//     variant,
//     size,
//     circular,
//     iconOnly,
//     darkMode,
//     textSizeVariant,
//     textWeightVariant,
//   } = ownerState;
//   const { white, text, transparent, gradients, grey } = palette;
//   const { boxShadow, linearGradient, pxToRem, rgba } = functions;
//   const { borderRadius } = borders;
//   const { colored } = boxShadows;
//   const getFontSizeVariant = () => {
//     switch (textSizeVariant) {
//       case 'header':
//         return 'h6';
//       case 'body':
//         return 'body1';
//       case 'default':
//       case 'button':
//       default:
//         return 'button';
//     }
//   };
//   const getFontWeightVariant = () => {
//     switch (textWeightVariant) {
//       case 'bold':
//         return 'bold';
//       case 'regular':
//         return 'regular';
//   const fontSizeVariant = getFontSizeVariant();
//   const fontWeightVariant = getFontWeightVariant();
//   const commonStyles = {
//     fontSize: typography[fontSizeVariant].fontSize,
//     fontWeight: typography.weight[fontWeightVariant],
//   const containedStyles = () => {
//     const backgroundValue = palette[color] ? palette[color].main : white.main;
//     const focusedBackgroundValue = palette[color]
//       ? palette[color].focus
//       : white.focus;
//     const boxShadowValue = colored[color]
//       ? `${boxShadow([0, 3], [3, 0], palette[color].main, 0.15)}, ${boxShadow(
//           [0, 3],
//           [1, -2],
//           palette[color].main,
//           0.2,
//         )}, ${boxShadow([0, 1], [5, 0], palette[color].main, 0.15)}`
//       : 'none';
//     const hoveredBoxShadowValue = colored[color]
//       ? `${boxShadow([0, 14], [26, -12], palette[color].main, 0.4)}, ${boxShadow(
//           [0, 4],
//           [23, 0],
//           0.15,
//         )}, ${boxShadow([0, 8], [10, -5], palette[color].main, 0.2)}`
//     let colorValue = white.main;
//     let focusedColorValue = white.main;
//     if (
//       !darkMode &&
//       (color === 'white' || color === 'light' || !palette[color])
//     ) {
//       colorValue = text.main;
//     } else if (
//       darkMode &&
//       colorValue = grey[600];
//     if (color === 'white') {
//       focusedColorValue = text.main;
//     } else if (color === 'primary' || color === 'error' || color === 'dark') {
//       focusedColorValue = white.main;
//     return {
//       background: backgroundValue,
//       color: colorValue,
//       boxShadow: boxShadowValue,
//       '&:hover': {
//         backgroundColor: backgroundValue,
//         boxShadow: hoveredBoxShadowValue,
//       },
//       '&:focus:not(:hover)': {
//         backgroundColor: focusedBackgroundValue,
//         boxShadow: palette[color]
//           ? boxShadow([0, 0], [0, 3.2], palette[color].main, 0.5)
//           : boxShadow([0, 0], [0, 3.2], white.main, 0.5),
//       '&:disabled': {
//         color: focusedColorValue,
//     };
//   const outlinedStyles = () => {
//     const backgroundValue =
//       color === 'white' ? rgba(white.main, 0.1) : transparent.main;
//     const colorValue = palette[color] ? palette[color].main : white.main;
//     const boxShadowValue = palette[color]
//       ? boxShadow([0, 0], [0, 3.2], palette[color].main, 0.5)
//       : boxShadow([0, 0], [0, 3.2], white.main, 0.5);
//     let borderColorValue = palette[color]
//       ? palette[color].main
//       : rgba(white.main, 0.75);
//       borderColorValue = rgba(white.main, 0.75);
//       borderColor: borderColorValue,
//         background: transparent.main,
//         borderColor: colorValue,
//         boxShadow: boxShadowValue,
//       '&:active:not(:hover)': {
//         backgroundColor: colorValue,
//         color: white.main,
//         opacity: 0.85,
//         color: colorValue,
//   const gradientStyles = () => {
//       color === 'white' || !gradients[color]
//         ? white.main
//         : linearGradient(gradients[color].main, gradients[color].state);
//     } else if (color === 'light') {
//       colorValue = gradients.dark.state;
//         backgroundColor: white.main,
//         background: backgroundValue,
//   const textStyles = () => {
//     const focusedColorValue = palette[color]
//   const circularStyles = () => ({
//     borderRadius: borderRadius.section,
//   });
//   const iconOnlyStyles = () => {
//     let sizeValue = pxToRem(38);
//     if (size === 'small') {
//       sizeValue = pxToRem(25.4);
//     } else if (size === 'large') {
//       sizeValue = pxToRem(52);
//     let paddingValue = `${pxToRem(11)} ${pxToRem(11)} ${pxToRem(10)}`;
//       paddingValue = pxToRem(4.5);
//       paddingValue = pxToRem(16);
//       width: sizeValue,
//       minWidth: sizeValue,
//       height: sizeValue,
//       minHeight: sizeValue,
//       padding: paddingValue,
//       '& .material-icons': {
//         marginTop: 0,
//       '&:hover, &:focus, &:active': {
//         transform: 'none',
//   const holoStyles = () => {
//     const backgroundValue = palette[color]
//       : palette['primary'].light;
//     const boxShadowValue = `0 0 0 4px ${rgba(
//       palette[color].secondary || 'white',
//       0.4,
//     )}`;
//     const hoveredBoxShadowValue = `0 0 0 4px ${rgba(
//       0.15,
//       position: 'relative',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       width: '100%',
//       borderRadius: borderRadius.md,
//       transitionProperty: 'color, background, box-shadow',
//       transitionDuration: '0.35s',
//       background: `${backgroundValue} !important`,
//       color: `${colorValue} !important`,
//   return {
//     ...commonStyles,
//     ...(variant === 'contained' && containedStyles()),
//     ...(variant === 'outlined' && outlinedStyles()),
//     ...(variant === 'gradient' && gradientStyles()),
//     ...(variant === 'text' && textStyles()),
//     ...(variant === 'holo' && holoStyles()),
//     ...(circular && circularStyles()),
//     ...(iconOnly && iconOnlyStyles()),
// });
// export default RCButtonRoot;
// // import { Button } from '@mui/material';
// // import useMode from 'hooks/useMode';
// // import styledDefaultDefault from 'styledDefaultDefault-components';
// // export default styledDefaultDefault(Button)(({ ownerState }) => {
// //   const { theme } = useMode();
// //   const { palette, functions, borders, boxShadows } = theme;
// //   const {
// //     color,
// //     variant,
// //     size,
// //     circular,
// //     iconOnly,
// //     darkMode,
// //     textSizeVariant,
// //     textWeightVariant,
// //   } = ownerState;
// //   const { white, text, transparent, gradients, grey } = palette;
// //   const { boxShadow, linearGradient, pxToRem, rgba } = functions;
// //   const { borderRadius } = borders;
// //   const { colored } = boxShadows;
// //   let fontSizeVariant = 'button';
// //   let fontWeightVariant = 700;
// //   if (textSizeVariant === 'header') {
// //     fontSizeVariant = 'h6';
// //   } else if (textSizeVariant === 'body') {
// //     fontSizeVariant = 'body1';
// //   } else if (textSizeVariant === 'default' || textSizeVariant === 'button') {
// //     fontSizeVariant = 'button';
// //   }
// //   if (textWeightVariant === 'bold') {
// //     fontWeightVariant = 'bold';
// //   } else if (textWeightVariant === 'regular') {
// //     fontWeightVariant = 'regular';
// //   const containedStyles = () => {
// //     const backgroundValue = palette[color] ? palette[color].main : white.main;
// //     const focusedBackgroundValue = palette[color]
// //       ? palette[color].focus
// //       : white.focus;
// //     // boxShadow value
// //     const boxShadowValue = colored[color]
// //       ? `${boxShadow([0, 3], [3, 0], palette[color].main, 0.15)}, ${boxShadow(
// //           [0, 3],
// //           [1, -2],
// //           palette[color].main,
// //           0.2
// //         )}, ${boxShadow([0, 1], [5, 0], palette[color].main, 0.15)}`
// //       : 'none';
// //     // boxShadow value when button is hovered
// //     const hoveredBoxShadowValue = colored[color]
// //       ? `${boxShadow([0, 14], [26, -12], palette[color].main, 0.4)}, ${boxShadow(
// //           [0, 4],
// //           [23, 0],
// //           0.15
// //         )}, ${boxShadow([0, 8], [10, -5], palette[color].main, 0.2)}`
// //     // color value
// //     let colorValue = white.main;
// //     let focusedColorValue = white.main;
// //     if (
// //       !darkMode &&
// //       (color === 'white' || color === 'light' || !palette[color])
// //     ) {
// //       colorValue = text.main;
// //     } else if (
// //       darkMode &&
// //       colorValue = grey[600];
// //     }
// //     if (color === 'white') {
// //       focusedColorValue = text.main;
// //     } else if (color === 'primary' || color === 'error' || color === 'dark') {
// //       focusedColorValue = white.main;
// //     return {
// //       background: backgroundValue,
// //       color: colorValue,
// //       boxShadow: boxShadowValue,
// //       fontSize: theme.typography[fontSizeVariant].fontSize,
// //       fontWeight: theme.typography.weight[fontWeightVariant],
// //       '&:hover': {
// //         backgroundColor: backgroundValue,
// //         boxShadow: hoveredBoxShadowValue,
// //       },
// //       '&:focus:not(:hover)': {
// //         backgroundColor: focusedBackgroundValue,
// //         boxShadow: palette[color]
// //           ? boxShadow([0, 0], [0, 3.2], palette[color].main, 0.5)
// //           : boxShadow([0, 0], [0, 3.2], white.main, 0.5),
// //       '&:disabled': {
// //         color: focusedColorValue,
// //     };
// //   };
// //   const outlinedStyles = () => {
// //     // background color value
// //     const backgroundValue =
// //       color === 'white' ? rgba(white.main, 0.1) : transparent.main;
// //     const colorValue = palette[color] ? palette[color].main : white.main;
// //     const boxShadowValue = palette[color]
// //       ? boxShadow([0, 0], [0, 3.2], palette[color].main, 0.5)
// //       : boxShadow([0, 0], [0, 3.2], white.main, 0.5);
// //     let borderColorValue = palette[color]
// //       ? palette[color].main
// //       : rgba(white.main, 0.75);
// //       borderColorValue = rgba(white.main, 0.75);
// //       borderColor: borderColorValue,
// //         background: transparent.main,
// //         borderColor: colorValue,
// //         boxShadow: boxShadowValue,
// //       '&:active:not(:hover)': {
// //         backgroundColor: colorValue,
// //         color: white.main,
// //         opacity: 0.85,
// //         color: colorValue,
//   const gradientStyles = () => {
//       color === 'white' || !gradients[color]
//         ? white.main
//         : linearGradient(gradients[color].main, gradients[color].state);
//     } else if (color === 'light') {
//       colorValue = gradients.dark.state;
//         backgroundColor: white.main,
//         background: backgroundValue,
//   const textStyles = () => {
//     const focusedColorValue = palette[color]
//   const circularStyles = () => ({
//     borderRadius: borderRadius.section,
//   });
//   const iconOnlyStyles = () => {
//     let sizeValue = pxToRem(38);
//     if (size === 'small') {
//       sizeValue = pxToRem(25.4);
//     } else if (size === 'large') {
//       sizeValue = pxToRem(52);
//     let paddingValue = `${pxToRem(11)} ${pxToRem(11)} ${pxToRem(10)}`;
//       paddingValue = pxToRem(4.5);
//       paddingValue = pxToRem(16);
//       width: sizeValue,
//       minWidth: sizeValue,
//       height: sizeValue,
//       minHeight: sizeValue,
//       padding: paddingValue,
//       '& .material-icons': {
//         marginTop: 0,
//       '&:hover, &:focus, &:active': {
//         transform: 'none',
// const holoStyles = () => {
//   const backgroundValue = palette[color]
//     : palette['primary'].light;
//   // const hoveredBackgroundValue = palette[color]
//   //   ? rgba(palette[color].main, 0.15)
//   //   : 'rgba(0, 0, 0, 0.075)';
//   const boxShadowValue = `0 0 0 4px ${rgba(palette[color].secondary || 'white', 0.4)}`;
//   const hoveredBoxShadowValue = `0 0 0 4px ${rgba(palette[color].secondary || 'white', 0.15)}`;
//     position: 'relative',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//     borderRadius: borderRadius.md,
//     transitionProperty: 'color, background, box-shadow',
//     transitionDuration: '0.35s',
//     background: `${backgroundValue} !important`, // Use !important to override any later conflicting styles
//     color: `${colorValue} !important`, // Use !important to override any later conflicting styles
//   return {
//     ...(variant === 'contained' && containedStyles()),
//     ...(variant === 'outlined' && outlinedStyles()),
//     ...(variant === 'gradient' && gradientStyles()),
//     ...(variant === 'text' && textStyles()),
//     ...(variant === 'holo' && holoStyles()),
//     ...(circular && circularStyles()),
//     ...(iconOnly && iconOnlyStyles()),
// });
