// CUSTOM THEMED LIBRARY
// import RCAlert from './RCAlert';
import {
  StyledIconContainer,
  StyledIconButton,
  StyledMenu,
  ScrollablePaper,
  EditorContainer,
  PdfPreviewContainer,
  FormContainer,
  LeftSection,
  RightSection,
  StyledDialogTitle,
  StyledTableHead,
  StyledTableCell,
  StyledLink,
  StyledAvatar,
  StyledPaper,
  AspectRatioBox,
  // NAV
  MainWrapper,
  PageWrapper,
  AppBarStyled,
  ToolbarStyled,
} from './styled/index.jsx';
import {
  RCAlert,
  RCBox,
  RCButton,
  RCCard,
  RCDialog,
  RCIconWrapper,
  RCSnackbar,
  RCTypography,
} from './themed/index.jsx';
import { HSeparator, VSeparator } from './themedV2/separator/Separator.jsx';

// PAGES

// APP COMPONENTS
export { default as AuthDialog } from './AuthDialog.jsx';
export { default as CoverLetterForm } from './CoverLetterForm.jsx';
export { default as DraftTabs } from './DraftTabs.jsx';
export { default as Generator } from './Generator.jsx';
export { default as NotificationSystem } from './NotificationSystem.jsx';
export { default as ResultAction } from './ResultAction.jsx';
export { default as ResultPreview } from './ResultPreview.jsx';
export { default as MiniCalendar } from './themedV2/calendar/MiniCalendar.jsx';
export { default as MarkdownEditor } from './MarkdownEditor.jsx';

// ARCHITECTURAL COMPONENTS
export { default as DashboardBox } from './common/DashboardBox.jsx';
export { default as FlexBetween } from './common/FlexBetween.jsx';
export { default as PageLayout } from './common/PageLayout.jsx';
export { default as PaperCard } from './common/PaperCard.jsx';

// SURFACE COMPONENTS
export { default as Card } from './themedV2/card/Card.jsx';

// LAYOUT COMPONENTS
export { default as FormContainerWithBackdrop } from './layout/FormContainerWithBackdrop.jsx';
export { default as FormFields } from './layout/FormFields.jsx';

// NAVIGATION COMPONENTS
export { default as MainMenu } from './themedV2/menu/MainMenu.jsx';
export { default as TransparentMenu } from './themedV2/menu/TransparentMenu.jsx';
export { default as ScrollToTop } from './themedV2/scroll/ScrollToTop.jsx';
export { default as FooterAdmin } from './themedV2/footer/FooterAdmin.jsx';
export { default as FooterAuth } from './themedV2/footer/FooterAuth.jsx';

// DATA DISPLAY COMPONENTS
export { default as MiniStatistics } from './themedV2/card/MiniStatistics.jsx';
export { default as BarChart } from './themedV2/charts/BarChart.jsx';

// DATA INPUT COMPONENTS
export { default as IconBox } from './themedV2/icons/IconBox.jsx';

// TEXT EDITOR COMPONENTS
export { default as TextEditor } from './TextEditor/index.jsx';
// export { default as QuillMarkdown } from './TextEditor/test/quillMarkdown.jsx';

// OTHER COMPONENTS
export { default as FixedPlugin } from './themedV2/fixedPlugin/FixedPlugin.jsx';
export { default as ItemContent } from './themedV2/menu/ItemContent.jsx';
// export { default as Separator } from './themedV2/separator/Separator.jsx';
export { default as Mastercard } from './themedV2/card/Mastercard.jsx';
export { default as Member } from './themedV2/card/Member.jsx';
export * from './themedV2/scrollbar/Scrollbar.jsx';
export * from './themedV2/icons/Icons.jsx';

// Export all components
export {
  RCBox,
  RCButton,
  RCCard,
  RCDialog,
  RCIconWrapper,
  RCTypography,
  RCSnackbar,
  HSeparator,
  VSeparator,
  StyledIconContainer,
  StyledIconButton,
  StyledMenu,
  ScrollablePaper,
  EditorContainer,
  PdfPreviewContainer,
  FormContainer,
  LeftSection,
  RightSection,
  StyledDialogTitle,
  StyledTableHead,
  StyledTableCell,
  StyledLink,
  StyledAvatar,
  StyledPaper,
  AspectRatioBox,
  MainWrapper,
  PageWrapper,
  AppBarStyled,
  ToolbarStyled,
};
