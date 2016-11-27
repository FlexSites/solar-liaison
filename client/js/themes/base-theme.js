import color from 'color';

import { Platform } from 'react-native';

export default {

    // Badge
  badgeBg: '#FD8224',
  badgeColor: '#fff',


  // Button
  btnFontFamily: (Platform.OS === 'ios') ? 'HelveticaNeue' : 'Roboto_medium',
  btnDisabledBg: '#b5b5b5',
  btnDisabledClr: '#f1f1f1',

  get btnPrimaryBg() {
    return this.brandPrimary;
  },
  get btnPrimaryColor() {
    return this.inverseTextColor;
  },
  get btnInfoBg() {
    return this.brandInfo;
  },
  get btnInfoColor() {
    return this.inverseTextColor;
  },
  get btnSuccessBg() {
    return this.brandSuccess;
  },
  get btnSuccessColor() {
    return this.inverseTextColor;
  },
  get btnDangerBg() {
    return this.brandDanger;
  },
  get btnDangerColor() {
    return this.inverseTextColor;
  },
  get btnWarningBg() {
    return this.brandWarning;
  },
  get btnWarningColor() {
    return this.inverseTextColor;
  },
  get btnTextSize() {
    return (Platform.OS === 'ios') ? this.fontSizeBase * 1.1 :
    this.fontSizeBase - 1;
  },
  get btnTextSizeLarge() {
    return this.fontSizeBase * 1.5;
  },
  get btnTextSizeSmall() {
    return this.fontSizeBase * 0.8;
  },
  get borderRadiusLarge() {
    return this.fontSizeBase * 3.8;
  },

  buttonPadding: 6,

  get iconSizeLarge() {
    return this.iconFontSize * 1.5;
  },
  get iconSizeSmall() {
    return this.iconFontSize * 0.6;
  },


  // Card
  cardDefaultBg: '#fff',


  // Check Box
  checkboxBgColor: '#FD8224',
  checkboxSize: 23,
  checkboxTickColor: '#fff',


  // Color
  brandPrimary: '#FD8224',
  brandInfo: '#FD8224',
  brandSuccess: '#FD8224',
  brandDanger: '#FD8224',
  brandWarning: '#FD8224',
  brandSidebar: '#FD8224',


  // Font
  fontFamily: (Platform.OS === 'ios') ? 'HelveticaNeue' : 'Roboto',
  fontSizeBase: 15,

  get fontSizeH1() {
    return this.fontSizeBase * 1.8;
  },
  get fontSizeH2() {
    return this.fontSizeBase * 1.6;
  },
  get fontSizeH3() {
    return this.fontSizeBase * 1.4;
  },


  // Footer
  footerHeight: 55,
  footerDefaultBg: (Platform.OS === 'ios') ? '#F8F8F8' : '#FD8224',


  // FooterTab
  tabBarTextColor: (Platform.OS === 'ios') ? '#FD8224' : '#FD8224',
  tabBarActiveTextColor: (Platform.OS === 'ios') ? '#FD8224' : '#fff',
  tabActiveBgColor: (Platform.OS === 'ios') ? '#FD8224' : undefined,


  // Header
  iosToolbarBtnColor: '#007aff',
  toolbarDefaultBg: (Platform.OS === 'ios') ? '#F8F8F8' : '#FD8224',
  toolbarHeight: (Platform.OS === 'ios') ? 64 : 56,
  toolbarIconSize: (Platform.OS === 'ios') ? 20 : 22,
  toolbarInputColor: '#CECDD2',
  toolbarInverseBg: '#222',
  toolbarTextColor: (Platform.OS === 'ios') ? '#000' : '#fff',
  get statusBarColor() {
    return color(this.toolbarDefaultBg).darken(0.2).hexString();
  },


  // Icon
  iconFamily: 'Ionicons',
  iconFontSize: (Platform.OS === 'ios') ? 30 : 28,
  iconMargin: 7,


  // InputGroup
  inputFontSize: 15,
  inputBorderColor: '#D9D5DC',
  inputSuccessBorderColor: '#2b8339',
  inputErrorBorderColor: '#ed2f2f',

  get inputColor() {
    return this.textColor;
  },
  get inputColorPlaceholder() {
    return '#575757';
  },

  inputGroupMarginBottom: 10,
  inputHeightBase: 40,
  inputPaddingLeft: 5,

  get inputPaddingLeftIcon() {
    return this.inputPaddingLeft * 8;
  },


  // Line Height
  btnLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 22,
  iconLineHeight: (Platform.OS === 'ios') ? 37 : 30,
  lineHeight: (Platform.OS === 'ios') ? 20 : 26,


  // List
  listBorderColor: '#ACAAAB',
  // listBorderColor: '#ddd',
  listDividerBg: '#ddd',
  listItemHeight: 45,
  listItemPadding: 9,
  listNoteColor: '#808080',
  listNoteSize: 13,


  // Progress Bar
  defaultProgressColor: '#FD8224',
  inverseProgressColor: '#1A191B',


  // Radio Button
  radioBtnSize: (Platform.OS === 'ios') ? 25 : 23,
  radioColor: '#7e7e7e',

  get radioSelectedColor() {
    return color(this.radioColor).darken(0.2).hexString();
  },


  // Spinner
  defaultSpinnerColor: '#45D56E',
  inverseSpinnerColor: '#1A191B',


  // Tabs
  tabBgColor: '#FD8224',
  tabFontSize: 15,
  tabTextColor: '#fff',


  // Text
  textColor: '#000',
  inverseTextColor: '#fff',


  // Title
  titleFontSize: (Platform.OS === 'ios') ? 17 : 19,
  subTitleFontSize: (Platform.OS === 'ios') ? 12 : 14,
  subtitleColor: '#FD8224',


  // Other
  borderRadiusBase: (Platform.OS === 'ios') ? 5 : 2,
  borderWidth: 1,
  contentPadding: 10,

  get darkenHeader() {
    return color(this.tabBgColor).darken(0.03).hexString();
  },

  dropdownBg: '#000',
  dropdownLinkColor: '#FD8224',
  inputLineHeight: 24,
  jumbotronBg: '#FD8224',
  jumbotronPadding: 30,
};
