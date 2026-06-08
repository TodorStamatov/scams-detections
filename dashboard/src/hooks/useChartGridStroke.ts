import { useTheme } from 'styled-components'
import { usePrefersDark } from './usePrefersDark'

export const useChartGridStroke = (): string => {
  const theme = useTheme()
  const dark = usePrefersDark();
  return dark ? theme.colors.zinc700 : theme.colors.zinc200;
};
