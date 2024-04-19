import {StyledTypography} from './styled';

interface TypographyProps {
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  fontSize = 16,
  fontWeight = 400,
  color = 'white',
  children,
}) => {
  return (
    <StyledTypography fontSize={fontSize} fontWeight={fontWeight} color={color}>
      {children}
    </StyledTypography>
  );
};
