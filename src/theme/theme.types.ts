export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: {
      gradient: {
        from: string;
        to: string;
      };
      main: string;
      white: string;
    };
    text: {
      primary: string;
      secondary: string;
      success: string;
    };
    border: string;
    gray: {
      50: string;
      100: string;
      200: string;
      400: string;
      600: string;
      700: string;
    };
    purple: {
      500: string;
      600: string;
      50: string;
    };
    indigo: {
      500: string;
    };
  };
  layout: {
    minHeight: string;
    container: {
      padding: string;
    };
  };
  spacing: {
    1: string;
    2: string;
    3: string;
    4: string;
    6: string;
    8: string;
    10: string;
  };
  borderRadius: {
    default: string;
    full: string;
    lg: string;
  };
  transitions: {
    default: string;
  };
  shadows: {
    md: string;
    inner: string;
  };
} 