import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'blue',
  components: {
    Button: {
      defaultProps: {
        size: 'sm'
      }
    },
    Container: {
      defaultProps: {
        size: 'sm'
      }
    }
  }
});